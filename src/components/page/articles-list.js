import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Alert, Space, Spin } from 'antd';
import Pagination from '@mui/material/Pagination';

import { fetchArticles } from '../../store/articles-slice';
import { ArticlePreview } from '../article-preview/article-preview';

const ArticlesList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const countArticles = useSelector((state) => state.articles.count);
  const err = useSelector((state) => state.articles.error);
  const status = useSelector((state) => state.articles.status);
  const isLogin = useSelector((state) => state.user.isLogin);
  const articles = useSelector((state) => state.articles.articles);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page, isLogin]);

  const elements =
    status === 'resolved' ? articles.map((article) => <ArticlePreview article={article} key={article.slug} />) : null;

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
      align="center"
    >
      {status === 'rejected' && <Alert type="error" message={`${err}`} />}
      {status === 'loading' && <Spin tip="Loading" size="large" />}
      {elements}

      <Pagination count={Math.ceil(countArticles / 5)} page={page} onChange={handleChange} />
    </Space>
  );
};

export { ArticlesList };
