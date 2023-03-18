import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseApi = 'https://blog.kata.academy/api/';

export const singUpUser = createAsyncThunk(
  'user/singUpUser',
  async ({ username, email, password }, { rejectWithValue }) =>
    axios
      .post(`${baseApi}users`, { user: { username, email, password } })
      .then((res) => res.data)
      .catch((err) =>
        rejectWithValue({
          status: err.response.status,
          statusText: 'Не верные данные. Логин или email уже существуют!',
        })
      )
);

export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }, { rejectWithValue }) =>
  axios
    .post(`${baseApi}users/login`, { user: { email, password } })
    .then((res) => res.data)
    .catch((err) =>
      rejectWithValue({
        status: err.response.status,
        statusText: 'Логин или пароль не верные',
      })
    )
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ username, email, password, avatarUrl: image }, { rejectWithValue }) => {
    return axios
      .put(
        `${baseApi}user`,
        { user: { username, email, password, image } },
        { headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookies.get('token')}` } }
      )
      .then((res) => res.data)
      .catch((err) =>
        rejectWithValue({
          status: err.response.status,
          statusText: 'Данные не изменились. Проверте заполнение полей!',
        })
      );
  }
);

export const getCurrentUser = createAsyncThunk('user/getCurrentUser ', async (_, { rejectWithValue }) => {
  return axios
    .get(`${baseApi}user`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookies.get('token')}` },
    })
    .then((res) => res.data)
    .catch((err) => rejectWithValue(err.message));
});

const pending = (state) => {
  state.status = 'loading';
  state.error = null;
  state.userCreate = false;
};

const rejected = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
  state.userCreate = false;
};

const fulfilled = (state, action) => {
  state.status = 'resolved';
  state.isLogin = true;
  state.userCreate = true;
  state.username = action.payload.user.username;
  state.email = action.payload.user.email;
  state.image = action.payload.user.image;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    image: '',
    bio: '',
    error: null,
    status: 'loading',
    userCreate: false,
    isLogin: false,
  },
  reducers: {
    logOut(state) {
      state.username = '';
      state.email = '';
      state.image = '';
      state.bio = '';
      state.isLogin = false;
      state.userCreate = false;
      Cookies.remove('token');
    },
    isSetNotUserCreate(state) {
      state.userCreate = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(singUpUser.pending, (state) => {
      pending(state);
    });
    builder.addCase(singUpUser.fulfilled, (state) => {
      state.status = 'resolved';
      state.userCreate = true;
    });
    builder.addCase(singUpUser.rejected, (state, action) => {
      rejected(state, action);
    });
    builder.addCase(loginUser.pending, (state) => {
      pending(state);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      fulfilled(state, action);
      Cookies.set('token', `${action.payload.user.token}`);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      rejected(state, action);
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      pending(state);
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      fulfilled(state, action);
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      rejected(state, action);
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.isLogin = true;
      state.userCreate = false;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { logOut, isSetNotUserCreate } = userSlice.actions;
export default userSlice.reducer;
