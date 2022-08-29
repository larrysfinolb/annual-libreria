import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import BookcasesTable from '../templates/BookcasesTable';
import { createBookcases } from '../utils/api';
import { showSpinner, hideSpinner } from '../utils/spinner';

const Bookcases = async (root, token) => {
	const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h2 class="h1">Estantes</h2>
				</div>
				<section class="mb-5 d-flex flex-column gap-2">
					<h3 class="h2">Añade un Nuevo Estante</h3>
					<form id="createForm" class="row g-3 w-100 mx-auto">
						<div class="col-sm-6">
							<label for="codigo" class="form-label">Codigo del Estante</label>
							<input type="text" class="form-control" id="codigo" required>
						</div>
						<div class="col-sm-6">
							<label for="activo" class="form-label">Estado del Estante (Activo)</label>
							<input type="number" class="form-control" id="activo" step="1" min="0" max="1" required>
						</div>
						<div class="col-12">
							<label for="descripcion" class="form-label">Descripcion del Estante</label>
							<input type="text" class="form-control" id="descripcion" required>
						</div>
						<div class="col-12">
							<button class="btn btn-dark w-100" type="submit">Añadir</button>
						</div>
					</form>
				</section>
				<section class="mb-3 d-flex flex-column gap-2">
					<h3 class="h2">Lista de Todos los Estantes</h3>
					<div class="table-responsive" id="table"></div>
				</section>
			</main>
		</div>
	</div>
    `;
	root.innerHTML = view;
	await Header(document.querySelector('#header'));
	await SidebarMenu(document.querySelector('#menu'));
	await BookcasesTable(document.querySelector('#table'), token);

	try {
		const createForm = document.querySelector('#createForm');

		createForm.addEventListener('submit', async (e) => {
			e.preventDefault();

			const Activo = Number(document.querySelector('#activo').value) || 0;
			const Codigo = document.querySelector('#codigo').value || '';
			const Descripcion = document.querySelector('#descripcion').value || '';

			if (isNaN(Activo)) throw "El valor del Campo 'Activo' debe ser un numero.";

			showSpinner();
			const result = await createBookcases({ Activo, Codigo, Descripcion }, token);
			hideSpinner();

			switch (result.Status) {
				case 0:
					createForm.reset();
					await BookcasesTable(document.querySelector('#table'), token);
					break;
				case -101:
					break;
				default:
			}
		});
	} catch (error) {
		console.error('Error', error);
	}
};

export default Bookcases;
