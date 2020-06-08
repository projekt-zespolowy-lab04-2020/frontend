/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const getTripCommentsByID = (tripID, token) => dispatch => {
  const path = baseURL + `/trips/${tripID}/comments`;
  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
