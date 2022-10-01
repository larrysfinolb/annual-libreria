const logout = () => {
  window.localStorage.removeItem('token');
  window.location.href = `${location.pathname}#login`;
};

export default logout;
