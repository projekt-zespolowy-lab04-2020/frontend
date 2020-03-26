import { baseURL } from '../helpers/paths';

const path = baseURL + '/user';

export const registerUser = userData => dispatch => {
  console.log(JSON.stringify(userData));

  return fetch(path, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(userData)
  });
};
