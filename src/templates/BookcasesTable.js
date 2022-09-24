import Searcher from './Searcher';
import { getAllBookcases, deleteBookcases, updateBookcases } from '../utils/api';
import { showAlert, hideAlert } from '../utils/alert';
import validateStatus from '../utils/validateStatus';

const BookcasesTable = async (root, token) => {
  const view = `
	<div id="searcherContainer"></div>
	<table class="table table-sm table-hover col-12">
		<thead class="table-dark">
			<tr>
				<th scope="col">#</th>
				<th scope="col">Código</th>
				<th scope="col">Descripción</th>
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
    let result = await getAllBookcases(token);

    validateStatus(result, tableAlert, () => {
      const html = result.Data.map(row => {
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
    });
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
							<label for="codigoModal" class="form-label">Código del Estante</label>
							<input type="text" class="form-control" id="codigoModal" value="${Codigo}" readonly required>
						</div>
						<div class="col-sm-6">
							<label for="activoModal" class="form-label">Estado del Estante (Activo)</label>
							<input type="number" class="form-control" id="activoModal" step="1" min="0" max="1" value="${Activo}" required>
						</div>
						<div class="col-12">
							<label for="descripcionModal" class="form-label">Descripción del Estante</label>
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

      document.querySelector('#editForm').addEventListener('submit', async e => {
        e.preventDefault();

        Activo = document.querySelector('#activoModal').value || 0;
        Descripcion = document.querySelector('#descripcionModal').value || '';

        if (isNaN(Number(Activo))) {
          showAlert(alertModal, "El valor del Campo 'Activo' debe ser un número.", 'danger');
          throw "El valor del Campo 'Activo' debe ser un número.";
        }

        hideAlert(alertModal);
        const result = await updateBookcases({ Activo, Codigo, Descripcion }, token);

        validateStatus(result, alertModal, async () => {
          modal.classList.remove('d-block');
          return BookcasesTable(root, token);
        });
      });

      document.querySelector('#deleteBtnModal').addEventListener('click', async () => {
        hideAlert(alertModal);
        const result = await deleteBookcases(Codigo, token);

        validateStatus(result, alertModal, async () => {
          modal.classList.remove('d-block');
          return BookcasesTable(root, token);
        });
      });

      document.querySelector('#closeBtnModal').addEventListener('click', () => modal.classList.remove('d-block'));
    });
  });
};

export default BookcasesTable;
