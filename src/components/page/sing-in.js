import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginUser } from '../../store/user-slice';
import { SingInForm } from '../user-forms/sing-inForm';

const SingIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector((state) => state.user.status);
  const isCreateUser = useSelector((state) => state.user.userCreate);

  const fromPage = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (status === 'resolved' && isCreateUser) {
      navigate(fromPage, { replace: true });
    }
  }, [status, isCreateUser, navigate, fromPage]);

  return <SingInForm submit={(data) => dispatch(loginUser(data))} />;
};

export { SingIn };
