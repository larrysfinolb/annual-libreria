import logout from './logout';

const validateStatus = (result, alert, message, callback) => {
  if (result.Status === 0) {
    callback();
    alert.textContent = message;
    alert.classList.add('alert-success');
    alert.classList.remove('alert-danger');
    alert.classList.remove('invisible');
  } else if (result.Status === -101) {
    logout();
  } else if (result.Status === 500) {
    alert.textContent = '¡Ups! El servidor ha fallado.';
    alert.classList.remove('alert-success');
    alert.classList.add('alert-danger');
    alert.classList.remove('invisible');

    console.error(result.Message);
  } else {
    alert.textContent = result.Message;
    alert.classList.remove('alert-success');
    alert.classList.add('alert-danger');
    alert.classList.remove('invisible');
  }
};

export { validateStatus };
export default validateStatus;
