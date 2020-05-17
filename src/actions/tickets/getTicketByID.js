/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const getTicketByID = (ticketID, token) => dispatch => {
  const path = baseURL + `/tickets/${ticketID}`;

  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
