import { Avatar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import baseAvatar from '../../img/avatar.svg';
import { logOut } from '../../store/user-slice';

import classes from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const userName = useSelector((state) => state.user.username);
  const avatarUrl = useSelector((state) => state.user.image);
  const path = avatarUrl ? avatarUrl : baseAvatar;

  return (
    <header className={classes.header}>
      <div>
        <Link to="/">Realworld Blog</Link>
      </div>
      {!isLogin && (
        <div>
          <Link to="/sing-in" style={{ marginRight: '10px' }}>
            Sing In
          </Link>
          <Link className={classes['btn-link']} to="/sing-up">
            Sing Up
          </Link>
        </div>
      )}
      {isLogin && (
        <div className={classes.flex}>
          <Link className={classes['btn-link']} to="/new-article">
            Create article
          </Link>
          <p>{userName}</p>
          <Link to="/profile">
            <Avatar src={path} />
          </Link>
          <Button
            variant="outlined"
            style={{ color: '#000000BF', borderColor: '#000000BF' }}
            onClick={() => dispatch(logOut())}
          >
            Log Out
          </Button>
        </div>
      )}
    </header>
  );
};

export { Header };
