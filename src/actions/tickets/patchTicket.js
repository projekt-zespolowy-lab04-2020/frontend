/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const patchTicket = (data, ticketID, token) => dispatch => {
  const path = baseURL + `/tickets/${ticketID}`;

  return fetch(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
};
