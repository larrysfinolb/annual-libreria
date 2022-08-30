import { loginSaint } from '../utils/api';
import { showSpinner, hideSpinner } from '../utils/spinner';
import hostname from '../utils/hostname';

const Login = async (root) => {
	const view = `
    <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <main class="row shadow w-100 rounded bg-light overflow-hidden" style="max-width: 750px">
            <div class="col-12 col-sm-6 bg-login"></div>
            <form id="loginForm" class="col-12 col-sm-6">
                <h2 class="h2 fw-bold text-center py-3 py-sm-5">Bienvenido a Annual Libreria</h2>
                <div class="mb-4">
                    <label for="idUser" class="form-label">Correo Electronico Asociado</label>
                    <input type="email" id="idUser" class="form-control" required>
                </div>
                <div class="mb-4">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" id="password" class="form-control" required>
                </div>
                <div class="mb-4">
                    <button type="submit" class="btn btn-dark w-100">Iniciar Sesión</button>
                </div>
                <div class="alert alert-danger d-flex align-items-center invisible" role="alert" id="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <span class="fw-bold ms-2">Error</span>
                </div>
            </form>
        </main>
    </div>
    `;
	root.innerHTML = view;

	try {
		const alert = document.querySelector('#alert');

		document.querySelector('#loginForm').addEventListener('submit', async (e) => {
			e.preventDefault();

			const idUser = document.querySelector('#idUser').value || '';
			const password = document.querySelector('#password').value || '';

			alert.classList.add('invisible');
			showSpinner();
			const result = await loginSaint(idUser, password);
			hideSpinner();

			switch (result.Status) {
				case 0:
					window.localStorage.setItem('token', result.Message);
					window.location.href = `${hostname}/#`;
					break;
				case -2:
					alert.lastElementChild.innerHTML = 'Usuario no Registrado';
					alert.classList.remove('invisible');
					break;
				case -3:
					alert.lastElementChild.innerHTML = 'Contraseña Incorrecta';
					alert.classList.remove('invisible');
					break;
				default:
					alert.lastElementChild.innerHTML = 'Ups! Algo ha salido mal';
					alert.classList.remove('invisible');
					break;
			}
		});
	} catch (error) {
		console.error('Error', error);
	}
};

export default Login;
