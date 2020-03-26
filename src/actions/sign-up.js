import { baseURL } from '../helpers/paths';

const path = baseURL + '/user';

export const registerUser = userData => dispatch => {
  console.log(JSON.stringify(userData));

  return fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
};
