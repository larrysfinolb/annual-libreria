import { hideAlert, showAlert } from '../utils/alert';
import { deleteInventoryInstance, getAllInventoryInstances, updateInventoryInstance } from '../utils/api';
import logout from '../utils/logout';
import validateStatus from '../utils/validateStatus';
import Searcher from './Searcher';

const InventoryInstancesTable = async (root, token) => {
	const view = `
	<div id="searcherContainer"></div>
	<table class="table table-sm table-hover col-12">
		<thead class="table-dark">
			<tr>
				<th scope="col">#</th>
				<th scope="col">Codigo</th>
				<th scope="col">Descripcion</th>
				<th scope="col">Cantidad de Productos</th>
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
		let result = await getAllInventoryInstances(token);

		if (result.Status === 0) {
			buildTable(root, token, tbody, result);
		} else if (result.Status === -101) {
			logout();
		} else if (result.Status === 500) {
			showAlert(tableAlert, 'Ups! Algo ha fallado en el servidor.', 'danger');
			console.log(result.Message);
		} else {
			showAlert(tableAlert, result.Message, 'danger');
		}
	} catch (error) {
		console.error('Error', error);
	}
};

const buildTable = async (root, token, tbody, result) => {
	const html = result.Data.map((row) => {
		return `
		<tr>
			<th scope="row">${row.Fila}</th>
			<td>${row.Codigo}</td>
			<td>${row.Descripcion}</td>
			<td>${row.CantidadProductos}</td>
		</tr>
		`;
	}).join('');
	tbody.innerHTML = html;

	document.querySelectorAll('#tbody tr').forEach((tr, index) => {
		tr.addEventListener('click', () => {
			const modal = document.querySelector('#modal');

			const row = result.Data[index];

			const Codigo = row.Codigo || 0;
			let Descripcion = row.Descripcion || '';

			const html = `
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body">
						<form id="editForm" class="row g-3 w-100 mx-auto">
							<div class="col-12">
								<label for="codigoModal" class="form-label">Codigo de la Instancia de Inventario</label>
								<input type="text" class="form-control" id="codigoModal" value="${Codigo}" readonly required>
							</div>
							<div class="col-12">
								<label for="descripcionModal" class="form-label">Descripcion de la Instancia de Inventario</label>
								<input type="text" class="form-control" id="descripcionModal" value="${Descripcion}" required>
							</div>
							<div class="col-12">
								<button class="btn btn-dark w-100" type="submit">Editar</button>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<div class="alert d-flex align-items-center invisible w-100" role="alert" id="alertModal"></div>
						<button type="button" class="btn btn-danger" id="deleteBtnModal">Eliminar</button>
						<button type="button" class="btn btn-secondary" id="closeBtnModal">Cerrar</button>
					</div>
				</div>
			</div>
			`;
			modal.innerHTML = html;
			modal.classList.add('d-block');

			const alertModal = document.querySelector('#alertModal');

			document.querySelector('#editForm').addEventListener('submit', async (e) => {
				e.preventDefault();

				Descripcion = document.querySelector('#descripcionModal').value || '';

				hideAlert(alertModal);
				let result = await updateInventoryInstance({ Codigo, Descripcion }, token);

				validateStatus(result, alertModal, async () => {
					modal.classList.remove('d-block');
					return InventoryInstancesTable(root, token);
				});
			});

			document.querySelector('#deleteBtnModal').addEventListener('click', async () => {
				hideAlert(alertModal);
				let result = await deleteInventoryInstance(Codigo, token);

				validateStatus(result, alertModal, async () => {
					modal.classList.remove('d-block');
					return InventoryInstancesTable(root, token);
				});
			});

			document.querySelector('#closeBtnModal').addEventListener('click', () => modal.classList.remove('d-block'));
		});
	});
};

export default InventoryInstancesTable;
