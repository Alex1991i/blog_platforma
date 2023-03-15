import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RequireAuth } from '../../hoc/RequireAuth';
import { getCurrentUser } from '../../store/user-slice';
import Layout from '../layout/layout';
import { ArticlesList } from '../page/articles-list';
import { CreateNewArticle } from '../page/create-new-article';
import { EditArticle } from '../page/edit-article';
import { EditProfile } from '../page/edit-profile';
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
          <Route path="articles" element={<Navigate to={'/'} replace />} />
          <Route path="articles/:slug" element={<SinglArticle />} />
          <Route path="sing-up" element={<SingUp />} />
          <Route path="sing-in" element={<SingIn />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route
            path="new-article"
            element={
              <RequireAuth>
                <CreateNewArticle />
              </RequireAuth>
            }
          />
          <Route
            path="articles/:slug/edit"
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route path="*" element={<ArticlesList />} />
        </Route>
      </Routes>
    </>
  );
};

export { App };
