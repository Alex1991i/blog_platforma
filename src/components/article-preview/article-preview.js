import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Avatar, Button, Checkbox } from '@mui/material';
import { v4 } from 'uuid';
import { Tag } from 'antd';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { fetchDeleteArticle, fetchDeleteFavorites, fetchFavorites } from '../../store/articles-slice';

import classes from './article-preview.module.scss';

const ArticlePreview = ({ article, viewButton }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [favoriteChecked, setFavoriteChecked] = useState(article?.favorited || false);
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);

  const onChecked = (event) => {
    if (event.target.checked) {
      dispatch(fetchFavorites(article.slug));
      setFavoriteChecked(true);
      setFavoriteCount(favoriteCount + 1);
    } else {
      dispatch(fetchDeleteFavorites(article.slug));
      setFavoriteChecked(false);
      setFavoriteCount(favoriteCount - 1);
    }
  };

  const elements = article.tagList.slice(0, 5).map((tag) => (
    <Tag style={{ maxWidth: '100px', overflow: 'hidden' }} key={v4()}>
      {tag}
    </Tag>
  ));

  return (
    <div className={classes.card}>
      <Link className={classes.title} to={`/articles/${article.slug}`}>
        {article.title}
      </Link>
      <div className={classes.heart}>
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: 'red' }} />}
          disabled={!isLogin}
          checked={favoriteChecked}
          onClick={(event) => onChecked(event)}
        />
        <span>{favoriteCount}</span>
      </div>
      <div className={classes.name}>{article.author.username}</div>
      <div className={classes.date}>
        {format(new Date(article.createdAt), 'MMMM d, yyyy', {
          locale: enGB,
        })}
      </div>
      <div className={classes.avatar}>
        <Avatar alt={article.author.username} src={article.author.image} />
      </div>
      <div className={classes.tag}>{elements}</div>
      <div className={classes.text}>{article.description}</div>
      {viewButton && username === article.author.username && (
        <>
          <Link className={classes['btn-link']} to="/articles/:slug/edit">
            Edit
          </Link>
          <Button
            className={classes['btn-delete']}
            size="small"
            variant="outlined"
            color="error"
            onClick={() => dispatch(fetchDeleteArticle())}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export { ArticlePreview };