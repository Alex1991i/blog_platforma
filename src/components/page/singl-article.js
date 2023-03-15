import { Space } from 'antd';

import { Article } from '../article/article';

const SinglArticle = () => {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: 'flex',
      }}
      align="center"
    >
      <Article />
    </Space>
  );
};

export { SinglArticle };
