import Searcher from './Searcher';
import { getAllBookcases, deleteBookcases, updateBookcases } from '../utils/api';
import hostname from '../utils/hostname';
import { showSpinner, hideSpinner } from '../utils/spinner';
import { showAlert, hideAlert } from '../utils/alert';
import logout from '../utils/logout';

const BookcasesTable = async (root, token) => {
	const view = `
	<div id="searcherContainer"></div>
	<table class="table table-sm table-hover col-12">
		<thead class="table-dark">
			<tr>
				<th scope="col">#</th>
				<th scope="col">Codigo</th>
				<th scope="col">Descripcion</th>
				<th scope="col">Activo</th>
			</tr>
		</thead>
		<tbody id="tbody"></tbody>
	</table>
    `;
	root.innerHTML = view;

	const tbody = document.querySelector('#tbody');
	await Searcher(document.querySelector('#searcherContainer'), tbody);

	try {
		const tableAlert = document.querySelector('#tableAlert');

		hideAlert(tableAlert);
		showSpinner();
		let result = await getAllBookcases(token);
		hideSpinner();

		switch (result.Status) {
			case 0:
				const html = result.Data.map((row) => {
					return `
						<tr>
							<th scope="row">${row.Fila}</th>
							<td>${row.Codigo}</td>
							<td>${row.Descripcion}</td>
							<td>${row.Activo}</td>
						</tr>
					`;
				}).join('');
				tbody.innerHTML = html;

				buildModal(root, token, result);
				break;
			case -101:
				window.localStorage.removeItem('token');
				window.location.href = `${hostname}/#login`;
				break;
			case 500:
				showAlert(tableAlert, 'Ups! Algo ha pasado entre el Cliente y el Servidor.', 'danger');
				break;
			default:
				console.log(result);
		}
	} catch (error) {
		console.error('Error', error);
	}
};

const buildModal = (root, token, result) => {
	document.querySelectorAll('#tbody tr').forEach((tr, index) => {
		tr.addEventListener('click', () => {
			const modal = document.querySelector('#modal');

			const row = result.Data[index];

			let Activo = row.Activo || 0;
			const Codigo = row.Codigo || '';
			let Descripcion = row.Descripcion || '';

			const html = `
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body">
					<form id="editForm" class="row g-3 w-100 mx-auto">
						<div class="col-sm-6">
							<label for="codigo" class="form-label">Codigo del Estante</label>
							<input type="text" class="form-control" id="codigoModal" value="${Codigo}" readonly required>
						</div>
						<div class="col-sm-6">
							<label for="activo" class="form-label">Estado del Estante (Activo)</label>
							<input type="number" class="form-control" id="activoModal" step="1" min="0" max="1" value="${Activo}" required>
						</div>
						<div class="col-12">
							<label for="descripcion" class="form-label">Descripcion del Estante</label>
							<input type="text" class="form-control" id="descripcionModal" value="${Descripcion}" required>
						</div>
						<div class="col-12">
							<button class="btn btn-dark w-100" type="submit">Editar</button>
						</div>
					</form>
					</div>
					<div class="modal-footer">
						<div class="alert d-flex align-items-center invisible w-100" role="alert" id="modalAlert"></div>
						<button type="button" class="btn btn-danger" id="deleteBtnModal">Eliminar</button>
						<button type="button" class="btn btn-secondary" id="closeBtnModal">Cerrar</button>
					</div>
				</div>
			</div>
			`;
			modal.innerHTML = html;
			modal.classList.add('d-block');

			const modalAlert = document.querySelector('#modalAlert');

			document.querySelector('#editForm').addEventListener('submit', async (e) => {
				e.preventDefault();

				Activo = document.querySelector('#activoModal').value || 0;
				Descripcion = document.querySelector('#descripcionModal').value || '';

				if (isNaN(Number(Activo))) {
					showAlert(modalAlert, "El valor del Campo 'Activo' debe ser un numero.", 'danger');
					throw "El valor del Campo 'Activo' debe ser un numero.";
				}

				hideAlert(modalAlert);
				showSpinner();
				const result = await updateBookcases({ Activo, Codigo, Descripcion }, token);
				hideSpinner();

				switch (result.Status) {
					case 0:
						modal.classList.remove('d-block');
						return BookcasesTable(root, token);
					case -97:
						showAlert(modalAlert, 'Descripcion es un campo obligatorio', 'danger');
						break;
					case -101:
						logout();
						break;
					case 500:
						showAlert(modalAlert, 'Ups! Algo ha ocurrido entre el cliente y el servidor.', 'danger');
						break;
					default:
						showAlert(modalAlert, result.Message, 'danger');
				}
			});

			document.querySelector('#deleteBtnModal').addEventListener('click', async () => {
				hideAlert(modalAlert);
				showSpinner();
				const result = await deleteBookcases(Codigo, token);
				hideSpinner();

				switch (result.Status) {
					case 0:
						modal.classList.remove('d-block');
						return BookcasesTable(root, token);
					case -2:
						showAlert(modalAlert, 'No se puede eliminar. Posee existencias.', 'danger');
						break;
					case -101:
						logout();
						break;
					case 500:
						showAlert(modalAlert, 'Ups! Algo ha ocurrido entre el cliente y el servidor.', 'danger');
						break;
					default:
						showAlert(modalAlert, result.Message, 'danger');
				}
			});

			document.querySelector('#closeBtnModal').addEventListener('click', () => modal.classList.remove('d-block'));
		});
	});
};

export default BookcasesTable;
