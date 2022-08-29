import { getAllBookcases, deleteBookcases } from '../utils/api';
import hostname from '../utils/hostname';
import { showSpinner, hideSpinner } from '../utils/spinner';

const BookcasesTable = async (root, token) => {
	const view = `
	<table class="table table-sm table-hover col-12">
		<thead class="table-dark">
			<tr>
				<th scope="col">#</th>
				<th scope="col">CODIGO</th>
				<th scope="col">DESCRIPCION</th>
				<th scope="col">ACTIVO</th>
			</tr>
		</thead>
		<tbody id="tbody"></tbody>
	</table>
    `;
	root.innerHTML = view;

	try {
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
				const tbody = document.querySelector('#tbody');
				tbody.innerHTML = html;

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
										<input type="text" class="form-control" id="codigo" value="${Codigo}" disabled required>
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
									<button type="button" class="btn btn-danger" id="deleteBtnModal">Eliminar</button>
									<button type="button" class="btn btn-secondary" id="closeBtnModal">Cerrar</button>
								</div>
							</div>
						</div>
						`;
						modal.innerHTML = html;

						document.querySelector('#deleteBtnModal').addEventListener('click', async () => {
							showSpinner();
							const result = await deleteBookcases(Codigo, token);
							hideSpinner();

							switch (result.Status) {
								case 0:
									modal.classList.remove('d-block');
									tr.classList.add('d-none');
									break;
								case -2:
									break;
								default:
							}
						});

						document.querySelector('#closeBtnModal').addEventListener('click', () => modal.classList.remove('d-block'));

						modal.classList.add('d-block');
					});
				});

				break;
			case -101:
				window.localStorage.removeItem('token');
				window.location.href = `${hostname}/#login`;
				break;
		}
	} catch (error) {
		console.error('Error', error);
	}
};

export default BookcasesTable;
