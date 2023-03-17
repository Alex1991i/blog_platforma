import { Outlet } from 'react-router-dom';

import { Header } from '../header/header';

import classes from './layout.module.scss';

const Layout = () => (
  <div className={classes.container}>
    <Header />
    <Outlet />
  </div>
);

export default Layout;
