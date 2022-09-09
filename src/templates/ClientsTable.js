import Searcher from './Searcher';
import { hideAlert, showAlert } from '../utils/alert';
import { deleteClient, getAllClients, updateClient } from '../utils/api';
import validateStatus from '../utils/validateStatus';

const ClientsTable = async (root, token) => {
	const view = `
    <div id="searcherContainer"></div>
	<table class="table table-sm table-hover col-12">
		<thead class="table-dark">
			<tr>
				<th scope="col">#</th>
				<th scope="col">Código</th>
				<th scope="col">Descripción</th>
				<th scope="col">ID Fiscal</th>
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
		let result = await getAllClients(token);

		validateStatus(result, tableAlert, () => buildTable(root, token, tbody, result));
	} catch (error) {
		console.log('Error', error);
	}
};

const buildTable = async (root, token, tbody, result) => {
	const html = result.Data.map((row) => {
		return `
        <tr>
            <th scope="row">${row.Fila}</th>
            <td>${row.Codigo}</td>
            <td>${row.Descripcion}</td>
            <td>${row.IDFiscal}</td>
            <td>${row.Activo}</td>
        </tr>
        `;
	}).join('');
	tbody.innerHTML = html;

	document.querySelectorAll('#tbody tr').forEach((tr, index) => {
		tr.addEventListener('click', () => {
			const modal = document.querySelector('#modal');

			const row = result.Data[index];

			let Activo = row.Activo || 0;
			const Codigo = row.Codigo || '';
			let Descripcion = row.Descripcion || '';
			let IDFiscal = row.IDFiscal || '';

			const html = `
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body">
						<form id="editForm" class="row g-3 w-100 mx-auto">
							<div class="col-12 col-sm-6">
								<label for="activoModal">Estado (Activo)</label>
								<input type="number" class="form-control" id="activoModal" min="0" max="1" step="1" value="${Activo}" required>
							</div>
							<div class="col-12 col-sm-6">
								<label for="codigoModal">Código del Cliente</label>
								<input type="text" class="form-control" id="codigoModal" value="${Codigo}" readonly required>
							</div>
							<div class="col-12">
								<label for="descripcionModal">Descripción del Cliente</label>
								<input type="text" class="form-control" id="descripcionModal" value="${Descripcion}" required>
							</div>
							<div class="col-12">
								<label for="idFiscalModal">ID Fiscal</label>
								<input type="text" class="form-control" id="idFiscalModal" value="${IDFiscal}" required>
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

				Activo = document.querySelector('#activoModal').value || 0;
				Descripcion = document.querySelector('#descripcionModal').value || '';
				IDFiscal = document.querySelector('#idFiscalModal').value || '';

				if (isNaN(Number(Activo))) {
					showAlert(alertModal, "El valor del Campo 'Activo' debe ser un número.", 'danger');
					throw "El valor del Campo 'Activo' debe ser un número.";
				}

				hideAlert(alertModal);
				const result = await updateClient({ Activo, Codigo, Descripcion, IDFiscal }, {}, token);

				validateStatus(result, alertModal, async () => {
					modal.classList.remove('d-block');
					return ClientsTable(root, token);
				});
			});

			document.querySelector('#deleteBtnModal').addEventListener('click', async () => {
				hideAlert(alertModal);
				const result = await deleteClient(Codigo, token);

				validateStatus(result, alertModal, () => {
					modal.classList.remove('d-block');
					return ClientsTable(root, token);
				});
			});

			document.querySelector('#closeBtnModal').addEventListener('click', () => modal.classList.remove('d-block'));
		});
	});
};

export default ClientsTable;
