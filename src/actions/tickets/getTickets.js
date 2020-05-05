/* eslint-disable no-unused-vars */
import { baseURL } from '../../helpers/paths';

export const getTickets = (option, token) => dispatch => {
  const path =
    baseURL +
    '/ticket' +
    `/?${option ? new URLSearchParams({ all: true }) : ''}`;

  return fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
};
