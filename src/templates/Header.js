import hostname from '../utils/hostname';

const Header = (root) => {
	const view = `
    <header class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <h1 class="navbar-brand col-md-3 col-lg-2 m-0 px-3 fs-6">Annual Librería</h1>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav w-100">
            <div class="nav-item text-nowrap">
                <button class="btn nav-link px-3 ms-md-auto" id="logoutBtn">Cerrar Sesión</button>
            </div>
        </div>
    </header>
    `;
	root.innerHTML = view;

	try {
		const logoutBtn = document.querySelector('#logoutBtn');

		logoutBtn.addEventListener('click', () => {
			window.localStorage.removeItem('token');
			window.location.href = `${hostname}/#login`;
		});
	} catch (error) {
		console.log('Error:', error);
	}
};

export default Header;
