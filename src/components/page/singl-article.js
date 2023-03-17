import { Space, Spin } from 'antd';
import { useSelector } from 'react-redux';

import { Article } from '../article/article';

const SinglArticle = () => {
  const error = useSelector((state) => state.articles.error);
  const status = useSelector((state) => state.articles.status);

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
      align="center"
    >
      {status === 'loading' && <Spin tip="Loading" size="large" />}
      {status === 'rejected' && <h1>Error: {error}</h1>}
      <Article />
    </Space>
  );
};

export { SinglArticle };
