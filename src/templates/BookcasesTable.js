import Searcher from '../templates/Searcher';
import { getAllBookcases, deleteBookcases } from '../utils/api';
import hostname from '../utils/hostname';
import { showSpinner, hideSpinner } from '../utils/spinner';
import { showAlert, hideAlert } from '../utils/alert';

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

				buildModal(tbody, result, token);
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

const buildModal = (tbody, result, token) => {
	document.querySelectorAll('#tbody tr').forEach((tr, index) => {
		tr.addEventListener('click', () => {
			const modal = document.querySelector('#modal');

			const row = result.Data[index];

			const Activo = row.Activo || 0;
			const Codigo = row.Codigo || '';
			const Descripcion = row.Descripcion || '';

			const html = `
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body">
					<form id="editForm" class="row g-3 w-100 mx-auto">
						<div class="col-sm-6">
							<label for="codigo" class="form-label">Codigo del Estante</label>
							<input type="text" class="form-control" id="codigo" value="${Codigo}" readonly required>
						</div>
						<div class="col-sm-6">
							<label for="activo" class="form-label">Estado del Estante (Activo)</label>
							<input type="number" class="form-control" id="activo" step="1" min="0" max="1" value="${Activo}" required>
						</div>
						<div class="col-12">
							<label for="descripcion" class="form-label">Descripcion del Estante</label>
							<input type="text" class="form-control" id="descripcion" value="${Descripcion}" required>
						</div>
						<div class="col-12">
							<button class="btn btn-dark w-100" type="submit">Editar</button>
						</div>
					</form>
					</div>
					<div class="modal-footer">
						<div class="alert d-flex align-items-center invisible" role="alert" id="modalAlert"></div>
						<button type="button" class="btn btn-danger" id="deleteBtnModal">Eliminar</button>
						<button type="button" class="btn btn-secondary" id="closeBtnModal">Cerrar</button>
					</div>
				</div>
			</div>
			`;
			modal.innerHTML = html;

			const modalAlert = document.querySelector('#modalAlert');

			document.querySelector('#editForm').addEventListener('submit', (e) => {
				e.preventDefault();
			});

			document.querySelector('#deleteBtnModal').addEventListener('click', async () => {
				hideAlert(modalAlert);
				showSpinner();
				const result = await deleteBookcases(Codigo, token);
				hideSpinner();

				switch (result.Status) {
					case 0:
						modal.classList.remove('d-block');
						tbody.removeChild(tbody.children[index]);
						break;
					case -101:
						window.localStorage.removeItem('token');
						window.location.href = `${hostname}/#login`;
						break;
					case 500:
						showAlert(modalAlert, 'Ups! Algo ha ocurrido entre el cliente y el servidor.', 'danger');
						break;
					default:
						console.log(result);
				}
			});

			document.querySelector('#closeBtnModal').addEventListener('click', () => modal.classList.remove('d-block'));

			modal.classList.add('d-block');
		});
	});
};

export default BookcasesTable;