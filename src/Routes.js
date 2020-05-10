import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, ProtectedRouteWithLayout } from './components/Route';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import { isUserAdmin } from 'helpers/isUserAdmin';

import {
  Dashboard as DashboardView,
  TicketsList,
  UserList as UserListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
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
        component={TicketsList}
        exact
        layout={MainLayout}
        path="/support"
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

export default Routes;
