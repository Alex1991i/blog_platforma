import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RequireAuth } from '../../hoc/RequireAuth';
import { getCurrentUser } from '../../store/user-slice';
import { PATH } from '../../util/constants';
import Layout from '../layout/layout';
import { ArticlesList } from '../page/articles-list';
import { CreateNewArticle } from '../page/create-new-article';
import { EditArticle } from '../page/edit-article';
import { EditProfile } from '../page/edit-profile';
import { NotFound } from '../page/not-found';
import { SingIn } from '../page/sing-in';
import { SingUp } from '../page/sing-up';
import { SinglArticle } from '../page/singl-article';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesList />} />
          <Route path={PATH.articles} element={<Navigate to={'/'} replace />} />
          <Route path={PATH.article} element={<SinglArticle />} />
          <Route path={PATH.singUp} element={<SingUp />} />
          <Route path={PATH.singIn} element={<SingIn />} />
          <Route
            path={PATH.profile}
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route
            path={PATH.newArticle}
            element={
              <RequireAuth>
                <CreateNewArticle />
              </RequireAuth>
            }
          />
          <Route
            path={PATH.editArticle}
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export { App };
