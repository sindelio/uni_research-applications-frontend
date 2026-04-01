import env from '../client-envs/current.js';
import Swal from 'sweetalert2';
import exists from './exists.js';

async function request(method, path, data, auth) {
  try {
    const options = { 
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (auth) {
      const jwt = localStorage.getItem('talent-sourcery-session-jwt');
      options.headers.authorization = `Bearer ${jwt}`;
    }
    if (method !== 'GET' && exists(data)) {
      options.body = JSON.stringify(data);
    }
    const url = `${env.BACKEND_URL}${path}`;
    const response = await fetch(url, options);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.error(err);
    await Swal.fire({
      title: 'Oops',
      text: `Something unexpected happened. Please request support directly at ${env.SUPPORT_EMAIL}`,
      confirmButtonText: 'OK',
    });
  }
}

export default request;
