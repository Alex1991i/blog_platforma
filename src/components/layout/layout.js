import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Layout;
