import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile } from '../../store/user-slice';
import { UserForms } from '../user-forms/user-forms';

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return <UserForms submit={(data) => dispatch(updateUserProfile(data))} user={user} />;
};

export { EditProfile };
