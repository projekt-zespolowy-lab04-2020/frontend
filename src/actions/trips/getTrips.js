/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const getTrips = token => dispatch => {
  const path = baseURL + '/trips';

  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
