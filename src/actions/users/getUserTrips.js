/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const getUserTrips = token => dispatch => {
  const path = baseURL + '/user/trips/active';

  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
