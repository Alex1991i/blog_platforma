import { useDispatch, useSelector } from 'react-redux';

import { fetchEditArticle } from '../../store/articles-slice';
import { ArticleForm } from '../article-form/article-form';

const EditArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.articleSingle);

  return <ArticleForm title="Edit article" submit={(data) => dispatch(fetchEditArticle(data))} article={article} />;
};

export { EditArticle };
