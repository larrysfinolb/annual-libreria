const Alert = async ({ id, style }) => {
  const alert = document.createElement('div');
  alert.id = id;
  alert.setAttribute('role', 'alert');
  alert.className = `alert alert-${style} invisible`;

  return alert;
};

export { Alert };
