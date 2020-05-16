import { baseURL } from '../helpers/paths';

const path = baseURL + '/users';

export const getUsers = token => dispatch => {
  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
