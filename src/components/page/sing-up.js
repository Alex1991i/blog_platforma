import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { isSetNotUserCreate, singUpUser } from '../../store/user-slice';
import { ErrorMessage } from '../error/error';
import { UserForms } from '../user-forms/user-forms';

const SingUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.user.status);
  const err = useSelector((state) => state.user.error);
  const isCreateUser = useSelector((state) => state.user.userCreate);

  useEffect(() => {
    if (status === 'resolved' && isCreateUser) {
      dispatch(isSetNotUserCreate());
      navigate('/sing-in', { replace: true });
    }
  }, [isCreateUser, status, navigate, dispatch]);

  return (
    <>
      {err && <ErrorMessage />}
      <UserForms signUp={true} submit={(data) => dispatch(singUpUser(data))} />
    </>
  );
};

export { SingUp };
