import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';

const NotFound = async (root) => {
	const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex flex-column align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h2 class="display-1 text-center fw-bold text-uppercase">404 Recurso no encontrado</h2>
				</div>
			</main>
		</div>
	</div>
    `;
	root.innerHTML = view;
	await Header(document.querySelector('#header'));
	await SidebarMenu(document.querySelector('#menu'));
};

export default NotFound;
