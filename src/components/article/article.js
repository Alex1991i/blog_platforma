import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { fetchArticleSingle } from '../../store/articles-slice';
import { ArticlePreview } from '../article-preview/article-preview';

import classes from './article.module.scss';

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticleSingle(slug));
  }, [dispatch, slug]);

  const article = useSelector((state) => state.articles.articleSingle);
  const status = useSelector((state) => state.articles.status);
  const content =
    status === 'resolved' && article ? (
      <>
        <ArticlePreview article={article} viewButton={true} />
        <ReactMarkdown className={classes.card}>{article.body}</ReactMarkdown>
      </>
    ) : null;

  return <>{content}</>;
};

export { Article };
