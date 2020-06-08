/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const getJoinedTrips = token => dispatch => {
  const path = baseURL + '/user/trips';

  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
