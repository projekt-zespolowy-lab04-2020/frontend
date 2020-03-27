/* eslint-disable no-prototype-builtins */
export default function(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}
