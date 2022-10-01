import { loginSaint } from '../utils/api';
import { hideAlert } from '../utils/alert';
import validateStatus from '../utils/validateStatus';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Alert } from '../components/Alert';

const Login = async root => {
  const view = `
    <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <main class="row gap-2 shadow w-100 rounded bg-light overflow-hidden" style="max-width: 750px">
            <div class="col-12 col-sm-6 bg-login"></div>
            <form id="form" class="col-12 col-sm-6 row g-3 mb-4">
                <h2 class="h2 fw-bold text-center py-3 py-sm-5">Annual Librería</h2>
            </form>
        </main>
    </div>
    `;
  root.innerHTML = view;

  let props = {};

  const form = document.querySelector('#form');
  const allNodes = [];

  // Creamos el input correo
  props = { labelValue: 'Correo electrónico', type: 'email', id: 'email', col: 12 };
  allNodes.push(Input(props));

  // Creamos el input contraseña
  props = { labelValue: 'Contraseña', type: 'password', id: 'password', col: 12 };
  allNodes.push(Input(props));

  // Creamos el botón submit
  props = { value: 'Iniciar sesión', type: 'submit', style: 'dark', col: 12 };
  allNodes.push(Button(props));

  // Creamos la alerta de error
  props = { id: 'alert', style: 'danger' };
  allNodes.push(Alert(props));

  form.append(...allNodes);

  try {
    const alert = document.querySelector('#alert');

    document.querySelector('#form').addEventListener('submit', async e => {
      e.preventDefault();

      const idUser = document.querySelector('#email').value || '';
      const password = document.querySelector('#password').value || '';

      hideAlert(alert);
      const result = await loginSaint(idUser, password);

      validateStatus(result, alert, 'Datos correcto.', () => {
        window.localStorage.setItem('token', result.Message);
        window.location.href = `${location.pathname}#`;
      });
    });
  } catch (error) {
    console.error('Error', error);
  }
};

export default Login;
