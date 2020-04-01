/* eslint-disable no-unused-vars */
import { baseURL } from '../helpers/paths';

export const patch = (data, token) => dispatch => {
  const path = baseURL + `/user/${'p15sebek@gmail.com'}`;
  return fetch(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};
