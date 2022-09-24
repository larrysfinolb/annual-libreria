import { showAlert } from './alert';
import logout from './logout';

const validateStatus = (result, alert, callback) => {
  if (result.Status === 0) {
    callback();
  } else if (result.Status === -101) {
    logout();
  } else if (result.Status === 500) {
    showAlert(alert, 'Ups! El servidor ha fallado.', 'danger');
    console.error(result.Message);
  } else {
    showAlert(alert, result.Message, 'danger');
  }
};

export default validateStatus;
