import { useDispatch } from 'react-redux';

import { fetchCreateArticle } from '../../store/articles-slice';
import { ArticleForm } from '../article-form/article-form';

const CreateNewArticle = () => {
  const dispatch = useDispatch();

  return <ArticleForm submit={(data) => dispatch(fetchCreateArticle(data))} />;
};

export { CreateNewArticle };
