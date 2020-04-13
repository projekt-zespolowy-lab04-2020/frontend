/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const patchUser = (email, data, token) => dispatch => {
  const path = baseURL + `/user/${email}`;

  return fetch(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};
