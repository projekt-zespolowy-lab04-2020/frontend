import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRouteWithLayout = props => {
  const {
    layout: Layout,
    component: Component,
    routeGuard,
    redirectPath,
    ...rest
  } = props;

  return (
    routeGuard !== undefined && (
      <Route
        {...rest}
        render={matchProps =>
          routeGuard ? (
            <Layout>
              <Component {...matchProps} />
            </Layout>
          ) : (
            <Redirect to={redirectPath} />
          )
        }
      />
    )
  );
};

ProtectedRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  redirectPath: PropTypes.string,
  routeGuard: PropTypes.bool
};

export default ProtectedRouteWithLayout;
