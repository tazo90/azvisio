import { http } from '../http-client';
import { createResource } from '../resource';

export const users = createResource('/users').extend({
  me: () => http.get('/users/me'),
});
