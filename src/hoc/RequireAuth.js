import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLogin = useSelector((state) => state.user.isLogin);

  if (!isLogin) {
    return <Navigate to={'/sing-in'} state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
