import axios from 'axios';
import * as AuthService from './services/auth.service';

const token = AuthService.getCurrentUser();

export default axios.create({
  baseURL: 'https://ice-delivery.fly.dev/api',
  headers: {
    'Content-type': 'application/json',
    'auth-token': token,
  },
});
