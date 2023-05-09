import axios from 'axios';

export default axios.create({
  baseURL: 'https://ice-delivery.fly.dev/api',
  headers: {
    'Content-type': 'application/json',
    'auth-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvcm9sbGFpY2VkZWxpdmVyeUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODIzNjE4NDh9.SN4E3rq-VbEZJ5pCVLv0aPFrxxghVwVhW93hTCJvJ2Q',
  },
});
