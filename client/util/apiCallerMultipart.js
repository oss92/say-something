import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import objectToFormdata from 'object-to-formdata';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApiMultipart(endpoint, method = 'post', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'multipart/formdata' },
    method,
    body: objectToFormdata(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
