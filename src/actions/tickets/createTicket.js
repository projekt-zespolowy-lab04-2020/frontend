/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const createTicket = (content, token) => dispatch => {
  const path = baseURL + '/ticket';

  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(content)
  });
};
