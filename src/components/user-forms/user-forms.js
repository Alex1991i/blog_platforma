import { Checkbox, FormControlLabel, TextField, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './user-form.module.scss';

const UserForms = ({ signUp, submit, user }) => {
  const title = signUp ? 'Create new account' : 'Edit profile';
  const buttonLabel = signUp ? 'Create' : 'Save';

  const schema = Yup.object().shape({
    username: Yup.string()
      .required('Поле Username не заполнено')
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .matches(/^[a-z][a-z0-9]*$/, 'You can only use lowercase English letters and numbers'),
    email: Yup.string().required('Поле Email address не заполнено').email('Email не верный'),
    password: Yup.string()
      .required('Поле Password не заполнено')
      .min(6, 'Минимум 6 символов')
      .max(40, 'Максимум 40 символов'),
    confirmPassword: Yup.string()
      .required('Поле "Confirm Password" должно быть заполнено')
      .oneOf([Yup.ref('password'), null], 'Passwords должны совпадать'),
    acceptPersonalInf: Yup.bool().oneOf([true], 'Предоставьте согласие на обработку персональных данных'),
    avatarUrl: Yup.string().url('Введите корректный URL'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      avatarUrl: user?.image,
    },
  });

  const onSubmit = (data) => {
    submit(data);
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>{title}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="username"
          label="User name"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            mb: 2,
          }}
          {...register('username')}
          error={!!errors?.username}
          helperText={errors?.username?.message}
        />
        <TextField
          id="email"
          type="email"
          variant="outlined"
          label="Email address"
          size="small"
          fullWidth
          sx={{
            mb: 2,
          }}
          {...register('email')}
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            mb: 2,
          }}
          {...register('password')}
          error={!!errors?.password}
          helperText={errors?.password?.message}
        />
        <TextField
          id="confirmPassword"
          label="Repeat password"
          type="password"
          size="small"
          fullWidth
          sx={{
            mb: 2,
          }}
          {...register('confirmPassword')}
          error={!!errors?.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        />
        {signUp && (
          <>
            <FormControlLabel
              control={<Checkbox {...register('acceptPersonalInf')} />}
              label="I agree to the processing of my personal information"
            />
            {!!errors?.acceptPersonalInf && (
              <Typography variant="caption" display="block" gutterBottom sx={{ color: 'red' }}>
                {errors?.acceptPersonalInf?.message}
              </Typography>
            )}
          </>
        )}
        {!signUp && (
          <TextField
            id="avatarUrl"
            type="url"
            label="Avatar image (url)"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 2,
            }}
            {...register('avatarUrl')}
            error={!!errors?.avatarUrl}
            helperText={errors?.avatarUrl?.message}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            my: 2,
          }}
        >
          {buttonLabel}
        </Button>
        {signUp && (
          <Typography variant="body2" justify="center" align="center">
            Already have an account? <Link to="/sing-in">Sing In.</Link>
          </Typography>
        )}
      </form>
    </div>
  );
};

export { UserForms };
