import store from '../redux/reducers';
import { ADMIN } from './types';

export const isUserAdmin = () => {
  const user = store.getState().user;

  return user.roles?.includes(ADMIN);
}
