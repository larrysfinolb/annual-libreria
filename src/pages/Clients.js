import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import ClientsTabble from '../templates/ClientsTable';

const Clients = async (root, token) => {
	const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h2 class="h1">Clientes</h2>
				</div>
				<section class="d-flex flex-column gap-2">
					<h3 class="h2">Lista de Todos los Clientes</h3>
					<div class="table-responsive" id="table"></div>
					<div class="alert d-flex align-items-center invisible" role="alert" id="tableAlert"></div>
				</section>
			</main>
		</div>
	</div>
    `;
	root.innerHTML = view;
	await Header(document.querySelector('#header'));
	await SidebarMenu(document.querySelector('#menu'));
	await ClientsTabble(document.querySelector('#table'), token);
};

export default Clients;
