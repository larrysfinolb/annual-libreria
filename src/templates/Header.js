import hostname from '../utils/hostname';

const Header = (root) => {
	const view = `
    <header class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Annual Libreria</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav w-100">
            <div class="nav-item text-nowrap">
                <button class="btn nav-link px-3 ms-md-auto" id="logoutBtn">Cerrar Sesion</button>
            </div>
        </div>
    </header>
    `;
	root.innerHTML = view;

	try {
		const logoutBtn = document.querySelector('#logoutBtn');

		logoutBtn.addEventListener('click', () => {
			window.location.href = `${hostname}/#login`;
		});
	} catch (error) {
		console.log('Error:', error);
	}
};

export default Header;
