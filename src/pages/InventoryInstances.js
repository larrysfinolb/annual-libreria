import Header from '../templates/Header';
import InventoryInstancesTable from '../templates/InventoryInstancesTable';
import SidebarMenu from '../templates/SidebarMenu';
import { hideAlert, showAlert } from '../utils/alert';
import { createInventoryInstance } from '../utils/api';
import validateStatus from '../utils/validateStatus';

const InventoryInstances = async (root, token) => {
	const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h2 class="h1">Instancias de Inventario</h2>
				</div>
				<section class="d-flex flex-column gap-2">
					<h3 class="h2">Crea una nueva Instancia de Inventario</h3>
					<form id="createForm" class="row g-3 w-100 mx-auto">
						<div class="col-12">
							<label for="descripcion" class="form-label">Descripcion de la Instancia de Inventario</label>
							<input type="text" class="form-control" id="descripcion" required>
						</div>
						<div class="col-12">
							<button class="btn btn-dark w-100" type="submit">Añadir</button>
						</div>
						<div class="alert d-flex align-items-center invisible" role="alert" id="formAlert"></div>
					</form>
				</section>
				<section class="d-flex flex-column gap-2">
					<h3 class="h2">Lista de Todas las Instancias de Inventario</h3>
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
	await InventoryInstancesTable(document.querySelector('#table'), token);

	try {
		const createForm = document.querySelector('#createForm');
		const formAlert = document.querySelector('#formAlert');

		createForm.addEventListener('submit', async (e) => {
			hideAlert(formAlert);
			e.preventDefault();

			const Descripcion = document.querySelector('#descripcion').value || '';

			hideAlert(formAlert);
			const result = await createInventoryInstance({ Descripcion }, token);

			validateStatus(result, formAlert, async () => {
				showAlert(formAlert, 'La Instancia de Inventario ha sido creada.', 'success');
				createForm.reset();
				await InventoryInstancesTable(document.querySelector('#table'), token);
			});
		});
	} catch (error) {
		console.error('Error', error);
	}
};

export default InventoryInstances;
