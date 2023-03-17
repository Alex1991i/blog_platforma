import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { isSetNotUserCreate, updateUserProfile } from '../../store/user-slice';
import { ErrorMessage } from '../error/error';
import { UserForms } from '../user-forms/user-forms';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.status === 'resolved' && user.userCreate) {
      dispatch(isSetNotUserCreate());
      navigate('/', { replace: true });
    }
  }, [user.userCreate, user.status, navigate, dispatch]);

  return (
    <>
      {user.error && <ErrorMessage />}
      <UserForms submit={(data) => dispatch(updateUserProfile(data))} user={user} />
    </>
  );
};

export { EditProfile };
