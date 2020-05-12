import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import store from './redux/reducers';
import { setCurrentUser } from './redux/authReducer';
import combineTokenAndUserData from './helpers/combineTokenAndUserData';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const App = () => {
  const keepUserLoggedIn = () => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      combineTokenAndUserData(token)
        .then(obj => store.dispatch(setCurrentUser(obj)))
        .catch(e =>
          console.error('Error during combining token and user data ', e)
        );
    }
  };

  useEffect(() => {
    keepUserLoggedIn();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
