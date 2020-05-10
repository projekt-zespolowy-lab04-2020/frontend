import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRouteWithLayout = props => {
  const { layout: Layout, component: Component, routeGuard, redirectPath, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        routeGuard()
        ? (<Layout>
            <Component {...matchProps} />
          </Layout>)
        : <Redirect to={redirectPath} />
      )}
    />
  );
};

ProtectedRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  routeGuard: PropTypes.func,
  redirectPath: PropTypes.string
};

export default ProtectedRouteWithLayout;