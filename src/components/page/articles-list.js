import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Space } from 'antd';
import Pagination from '@mui/material/Pagination';

import { fetchArticles } from '../../store/articles-slice';
import { ArticlePreview } from '../article-preview/article-preview';

const ArticlesList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const countArticles = useSelector((state) => state.articles.count);
  const error = useSelector((state) => state.articles.error);
  const status = useSelector((state) => state.articles.status);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page]);

  const elements = articles.map((article) => <ArticlePreview article={article} key={article.slug} />);

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
      {status === 'loading' && <h1>loading</h1>}
      {status === 'rejected' && <h1>Error: {error}</h1>}
      {elements}

      <Pagination count={Math.ceil(countArticles / 5)} page={page} onChange={handleChange} />
    </Space>
  );
};

export { ArticlesList };
