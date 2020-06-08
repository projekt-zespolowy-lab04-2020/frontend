/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const createTripComments = (content, tripID, token) => dispatch => {
  const path = baseURL + `/trips/${tripID}/comments`;

  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(content)
  });
};
