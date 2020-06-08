/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const joinTrip = (tripID, token) => dispatch => {
  const path = baseURL + `/user/trips/${tripID}`;
  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
