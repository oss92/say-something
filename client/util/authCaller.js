import fetch from 'node-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/auth`) :
  '/auth';

export default function callAuth(endpoint = 'facebook') {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method: 'get',
  })
  .then(
    response => response,
    error => error
  );
}
