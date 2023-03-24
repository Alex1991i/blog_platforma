import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import classes from './user-form.module.scss';

const SingInForm = ({ submit }) => {
  const schema = Yup.object().shape({
    email: Yup.string().required('Поле "Email" должно быть заполнено').email('Email не верный'),
    password: Yup.string()
      .min(6, 'Поле "Password" не должно содержать менее 6 символов')
      .max(40, 'Поле "Password" не должно содержать более 40 символов')
      .required('Поле "Password" должно быть заполнено'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    submit(data);
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Sing In</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          label="Email address"
          type="email"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
          {...register('password')}
          error={!!errors?.password}
          helperText={errors?.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            my: 2,
          }}
        >
          Login
        </Button>
        <Typography variant="body2" justify="center" align="center">
          Don’t have an account? <Link to="/sing-up">Sing Up.</Link>
        </Typography>
      </form>
    </div>
  );
};

export { SingInForm };
