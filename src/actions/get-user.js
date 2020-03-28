import { baseURL } from '../helpers/paths';

const path = baseURL + '/user';

export const getCurrentUser = token => dispatch => {
  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
