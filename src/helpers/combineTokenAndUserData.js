import jwtDecode from 'jwt-decode';
import { getCurrentUser } from '../actions/get-user';
import store from '../redux/reducers';

export default async function(token) {
  const decoded = jwtDecode(token);
  // noinspection JSCheckFunctionSignatures
  const currentUserRes = await store.dispatch(getCurrentUser(token));
  const currentUser = await currentUserRes.json();

  return {
    ...currentUser,
    ...decoded
  };
}
