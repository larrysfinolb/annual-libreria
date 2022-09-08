import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import BooksTable from '../templates/BooksTable';
import { hideAlert, showAlert } from '../utils/alert';
import { createBook, getAllInventoryInstances } from '../utils/api';
import validateStatus from '../utils/validateStatus';

const Books = async (root, token) => {
	const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h2 class="h1">Libros</h2>
				</div>
				<section class="d-flex flex-column gap-2">
					<h3 class="h2">Añade un Nuevo Libro</h3>
					<form id="createForm" class="row g-3 w-100 mx-auto">
						<div class="col-sm-6">
							<label for="codigo" class="form-label">Codigo del Estante</label>
							<input type="text" id="codigo" class="form-control" required>
						</div>
						<div class="col-sm-6">
							<label for="codigoInstancia" class="form-label">Instancia de Inventario</label>
							<select class="form-select" id="codigoInstancia"></select>
						</div>
						<div class="col-sm-6">
							<label for="descripcion" class="form-label">Descripcion del Libro</label>
							<input type="text" id="descripcion" class="form-control" required>
						</div>
						<div class="col-sm-6">
							<label for="costo" class="form-label">Costo del Libro</label>
							<input type="number" id="costo" class="form-control" min="0" step="0.01" required>
						</div>
						<div class="col-12">
							<button class="btn btn-dark w-100" type="submit">Añadir</button>
						</div>
						<div class="alert d-flex align-items-center invisible" role="alert" id="formAlert"></div>
					</form>
				</section>
				<section class="mb-3 d-flex flex-column gap-2">
					<h3 class="h2">Lista de Todos los Libros</h3>
					<div class="table-responsive" id="table"></div>
				</section>
			</main>
		</div>
	</div>
    `;
	root.innerHTML = view;
	await Header(document.querySelector('#header'));
	await SidebarMenu(document.querySelector('#menu'));
	await BooksTable(document.querySelector('#table'), token);

	try {
		const formAlert = document.querySelector('#formAlert');
		const createForm = document.querySelector('#createForm');

		hideAlert(formAlert);
		const result = await getAllInventoryInstances(token);

		validateStatus(result, formAlert, () => {
			const html = result.Data.map((row, index) => {
				if (index !== 0) {
					return `<option value="${row.Codigo}">${row.Codigo} | ${row.Descripcion}</option>`;
				} else {
					return `
						<option selected>Selecciona una Instancia</option>
						<option value="${row.Codigo}">${row.Codigo} | ${row.Descripcion}</option>
					`;
				}
			}).join('');
			document.querySelector('#codigoInstancia').innerHTML = html;
		});

		createForm.addEventListener('submit', async (e) => {
			e.preventDefault();

			const Codigo = document.querySelector('#codigo').value || '';
			const CodigoInstancia = document.querySelector('#codigoInstancia').value || '';
			const Costo = document.querySelector('#costo').value || 0;
			const Descripcion = document.querySelector('#descripcion').value || '';

			if (isNaN(Number(Costo))) {
				showAlert(formAlert, "El valor del Campo 'Costo' debe ser un número.");
				throw "El valor del Campo 'Costo' debe ser un número.";
			}

			hideAlert(formAlert);
			const result = await createBook({ Codigo, CodigoInstancia, Costo, Descripcion }, token);

			validateStatus(result, formAlert, async () => {
				showAlert(formAlert, 'El Libro ha sido añadido.', 'success');
				createForm.reset();
				await BooksTable(document.querySelector('#table'), token);
			});
		});
	} catch (error) {
		console.error('Error', error);
	}
};

export default Books;
