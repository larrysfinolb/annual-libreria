import { loginSaint } from '../utils/api';
import { showAlert, hideAlert } from '../utils/alert';
import validateStatus from '../utils/validateStatus';

const Login = async root => {
  const view = `
    <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <main class="row shadow w-100 rounded bg-light overflow-hidden" style="max-width: 750px">
            <div class="col-12 col-sm-6 bg-login"></div>
            <form id="loginForm" class="col-12 col-sm-6">
                <h2 class="h2 fw-bold text-center py-3 py-sm-5">Inicia sesión en Annual Librería</h2>
                <div class="mb-4">
                    <label for="idUser" class="form-label">Correo Electrónico Asociado</label>
                    <input type="email" id="idUser" class="form-control" required>
                </div>
                <div class="mb-4">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" id="password" class="form-control" required>
                </div>
                <div class="mb-4">
                    <button type="submit" class="btn btn-dark w-100">Iniciar sesión</button>
                </div>
                <div class="alert alert-danger d-flex align-items-center invisible" role="alert" id="alert"></div>
            </form>
        </main>
    </div>
    `;
  root.innerHTML = view;

  try {
    const alert = document.querySelector('#alert');

    document.querySelector('#loginForm').addEventListener('submit', async e => {
      e.preventDefault();

      const idUser = document.querySelector('#idUser').value || '';
      const password = document.querySelector('#password').value || '';

      hideAlert(alert);
      const result = await loginSaint(idUser, password);

      validateStatus(result, alert, () => {
        window.localStorage.setItem('token', result.Message);
        window.location.href = `${location.pathname}#`;
      });
    });
  } catch (error) {
    console.error('Error', error);
  }
};

export default Login;
