import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { isSetNotUserCreate, loginUser } from '../../store/user-slice';
import { ErrorMessage } from '../error/error';
import { SingInForm } from '../user-forms/sing-inForm';

const SingIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector((state) => state.user.status);
  const isCreateUser = useSelector((state) => state.user.userCreate);
  const err = useSelector((state) => state.user.error);

  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (status === 'resolved' && isCreateUser) {
      dispatch(isSetNotUserCreate());
      navigate(fromPage, { replace: true });
    }
  }, [status, isCreateUser, navigate, fromPage, dispatch]);

  return (
    <>
      {err && <ErrorMessage />}
      <SingInForm submit={(data) => dispatch(loginUser(data))} />
    </>
  );
};

export { SingIn };
