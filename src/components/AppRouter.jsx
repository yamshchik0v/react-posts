import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router/routes';
import MyLoader from './UI/loader/MyLoader';

const AppRouter = () => {
  const { isUserAuthorized, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <MyLoader />;
  }

  return isUserAuthorized ? (
    <Routes>
      <Route path='*' element={<Navigate to='/posts' />} />
      {privateRoutes.map((route) => (
        <Route
          element={<route.component />}
          key={route.path}
          path={route.path}
          exact={route.exact}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      <Route path='*' element={<Navigate to='/login' />} />
      {publicRoutes.map((route) => (
        <Route
          element={<route.component />}
          key={route.path}
          path={route.path}
          exact={route.exact}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
