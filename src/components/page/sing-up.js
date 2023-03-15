import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { singUpUser } from '../../store/user-slice';
import { UserForms } from '../user-forms/user-forms';

const SingUp = () => {
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

  return <UserForms signUp={true} submit={(data) => dispatch(singUpUser(data))} />;
};

export { SingUp };
