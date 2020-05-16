/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

const path = baseURL + '/login';

export const loginUser = userData => dispatch => {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
};
