import env from '../client-envs/current.js';

const { LOCAL_STORAGE_KEY } = env;

async function checkSessionJwt() {
  const jwt = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (jwt === '') {
    window.location.href = '/app/signin';
  }
}

export default checkSessionJwt;
