/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const createComments = (content, ticketID, token) => dispatch => {
  const path = baseURL + `/tickets/${ticketID}/comments`;

  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(content)
  });
};
