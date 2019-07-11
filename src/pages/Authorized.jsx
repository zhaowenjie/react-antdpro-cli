/**
 * @author zhaowenjie
 * @email [zhaowenjie@surongtec.com]
 * @create date 2019-06-19 13:47:15
 * @modify date 2019-06-19 13:47:15
 * @desc [权限拦截]
 */
import Authorized from '@/utils/Authorized';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import React from 'react';
import Redirect from 'umi/redirect';

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      authorities = route.authority || authorities; // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent = ({
  children,
  route = {
    routes: [],
  },
  location,
  user,
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.userName;
  if (isLogin) {
    return (
      <Authorized
        authority={getRouteAuthority(location.pathname, routes)}
        noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/login" />}
      >
        {children}
      </Authorized>
    );
  }
  return <Redirect to="/login" />;
};

export default connect(({ user }) => ({
  user,
}))(AuthComponent);
