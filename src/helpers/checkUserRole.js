import store from '../redux/reducers';
import { ADMIN, USER } from './types';

export const checkUserRole = () => {
  const user = store.getState().user;

  if (!user.roles || !user.roles.length) {
    return null;
  } else if (user.roles.includes(ADMIN)) {
    return ADMIN;
  } else if (user.roles.includes(USER)) {
    return USER;
  }
};
