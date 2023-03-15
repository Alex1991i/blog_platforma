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
      .catch((err) => rejectWithValue(err.message))
);

export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }, { rejectWithValue }) =>
  axios
    .post(`${baseApi}users/login`, { user: { email, password } })
    .then((res) => res.data)
    .catch((err) => rejectWithValue(err.message))
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
      .catch((err) => rejectWithValue(err.message));
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
  },
  extraReducers: (builder) => {
    builder.addCase(singUpUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      state.userCreate = false;
    });
    builder.addCase(singUpUser.fulfilled, (state) => {
      state.status = 'resolved';
    });
    builder.addCase(singUpUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      state.userCreate = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.isLogin = true;
      state.userCreate = true;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      Cookies.set('token', `${action.payload.user.token}`);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      state.userCreate = false;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.isLogin = true;
      state.userCreate = true;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.isLogin = true;
      state.userCreate = true;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
