import React, { useEffect, useState } from 'react';
import { Switch, Redirect, withRouter } from 'react-router-dom';
import { RouteWithLayout, ProtectedRouteWithLayout } from './components/Route';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  TicketsList as TicketsView,
  TripsList as TripsView,
  UserList as UserListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ADMIN } from './helpers/types';

const Routes = ({ userObject }) => {
  const [isUserAdmin, setAdmin] = useState(undefined);
  const isAdmin = roles => roles.includes(ADMIN);

  useEffect(() => {
    const userRoles = userObject.roles;
    if (userRoles !== undefined) {
      setAdmin(isAdmin(userRoles));
    } else {
      setAdmin(undefined);
    }
  }, [userObject]);

  return (
    <Switch>
      <Redirect exact from="/" to="/sign-in" />
      <ProtectedRouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        routeGuard={isUserAdmin}
        redirectPath="/not-found"
      />
      <ProtectedRouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
        routeGuard={isUserAdmin}
        redirectPath="/not-found"
      />
      <RouteWithLayout
        component={TicketsView}
        exact
        layout={MainLayout}
        path="/support"
      />
      <RouteWithLayout
        component={TripsView}
        exact
        layout={MainLayout}
        path="/trips"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

Routes.propTypes = {
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return { userObject: user };
};

export default connect(mapStateToProps, null)(withRouter(Routes));
