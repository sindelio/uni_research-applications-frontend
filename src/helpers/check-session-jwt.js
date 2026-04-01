async function checkSessionJwt() {
  const jwt = localStorage.getItem('talent-sourcery-session-jwt');
  if (!jwt) {
    window.location.href = '/signin';
  }
}

export default checkSessionJwt;
