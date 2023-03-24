import { Avatar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import baseAvatar from '../../img/avatar.svg';
import { logOut } from '../../store/user-slice';
import { PATH } from '../../util/constants';

import classes from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const userName = useSelector((state) => state.user.username);
  const avatarUrl = useSelector((state) => state.user.image);
  const path = avatarUrl ? avatarUrl : baseAvatar;
  const statusUser = useSelector((state) => state.user.status);
  const statusArticle = useSelector((state) => state.articles.status);

  console.log(statusUser, statusArticle);

  return (
    <header className={classes.header}>
      <div>
        <Link to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : '/'}>Realworld Blog</Link>
      </div>
      {!isLogin && (
        <div>
          <Link
            to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : PATH.singIn}
            style={{ marginRight: '10px' }}
          >
            Sing In
          </Link>
          <Link
            className={classes['btn-link']}
            to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : PATH.singUp}
          >
            Sing Up
          </Link>
        </div>
      )}
      {isLogin && (
        <div className={classes.flex}>
          <Link
            className={classes['btn-link']}
            to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : PATH.newArticle}
          >
            Create article
          </Link>
          <p>{userName}</p>
          <Link to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : PATH.profile}>
            <Avatar src={path} />
          </Link>
          <Button
            variant="outlined"
            style={{ color: '#000000BF', borderColor: '#000000BF' }}
            onClick={() => dispatch(logOut())}
            disabled={statusUser === 'loading' || statusArticle === 'loading' ? true : false}
          >
            Log Out
          </Button>
        </div>
      )}
    </header>
  );
};

export { Header };
