/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const createTrip = (data, token) => dispatch => {
  const path = baseURL + '/trips';

  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};
