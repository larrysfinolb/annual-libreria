// import Searcher from './Searcher';
import { deleteBooks, getAllBookcases, getAllBooksByBookcases, updateBook } from '../utils/api';
import { hideAlert, showAlert } from '../utils/alert';
import validateStatus from '../utils/validateStatus';

const BookTable = async (root, token) => {
  const view = `
	<div class="d-flex flex-column flex-sm-row justify-content-between gap-3">
		<div class="flex-grow-1">
		<select class="form-select" id="bookcases"></select>
		</div>
		<div class="flex-grow-1" id="searcherContainer"></div>
	</div>
	<table class="table table-sm table-hover col-12">
		<thead class="table-dark">
			<tr>
				<th scope="col">#</th>
				<th scope="col">Código</th>
				<th scope="col">Código de Instancia</th>
				<th scope="col">Descripción</th>
				<th scope="col">Costo</th>
			</tr>
		</thead>
		<tbody id="tbody"></tbody>
	</table>
    `;
  root.innerHTML = view;

  const tbody = document.querySelector('#tbody');
  // await Searcher(document.querySelector('#searcherContainer'), tbody);

  const bookcases = document.querySelector('#bookcases');

  try {
    const result = await getAllBookcases(token);

    validateStatus(result, null, () => {
      const htmlBookcases = result.Data.map((row, index) => {
        if (index !== 0) {
          return `<option value="${row.Codigo}">${row.Codigo} | ${row.Descripcion}</option>`;
        } else {
          return `				
				<option selected>Selecciona el Estante</option>
				<option value="${row.Codigo}">${row.Codigo} | ${row.Descripcion}</option>
				`;
        }
      }).join('');
      bookcases.innerHTML = htmlBookcases;
    });

    bookcases.addEventListener('change', async () => {
      const result = await getAllBooksByBookcases(bookcases.value, token);

      validateStatus(result, null, () => {
        const html = result.Data.map(row => {
          return `
						<tr>
							<th scope="row">${row.Fila}</th>
							<td>${row.Codigo}</td>
							<td>${row.CodigoInstancia}</td>
							<td>${row.Descripcion}</td>
							<td>${row.CostoActual}</td>
						</tr>
					`;
        }).join('');
        tbody.innerHTML = html;

        buildModal(root, token, result);
      });
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

      const Codigo = row.Codigo || '';
      let CodigoInstancia = row.CodigoInstancia || 0;
      let CostoActual = row.CostoActual || 0;
      let Descripcion = row.Descripcion || '';

      const html = `
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body">
					<form id="editForm" class="row g-3 w-100 mx-auto">
						<div class="col-sm-5">
							<label for="codigo" class="form-label">Código del Estante</label>
							<input type="text" class="form-control" id="codigoModal" value="${Codigo}" readonly required>
						</div>
						<div class="col-sm-7">
							<label for="codigo" class="form-label">Código de la Instancia de Inventario</label>
							<input type="number" class="form-control" id="codigoInstanciaModal" step="1" value="${CodigoInstancia}" required>
						</div>
						<div class="col-12">
							<label for="activo" class="form-label">Costo del Libro</label>
							<input type="number" class="form-control" id="costoActualModal" step="0.0001" min="0" value="${CostoActual}" required>
						</div>
						<div class="col-12">
							<label for="descripcion" class="form-label">Descripción del Estante</label>
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

      document.querySelector('#editForm').addEventListener('submit', async e => {
        e.preventDefault();

        CodigoInstancia = document.querySelector('#codigoInstanciaModal').value || 0;
        Descripcion = document.querySelector('#descripcionModal').value || '';
        CostoActual = document.querySelector('#costoActualModal').value || 0;

        if (isNaN(Number(CodigoInstancia))) {
          showAlert(formAlert, "El valor del Campo 'Código de Instancia' debe ser un número.", 'danger');
          throw "El valor del Campo 'Código de Instancia' debe ser un número.";
        } else if (isNaN(Number(CostoActual))) {
          showAlert(formAlert, "El valor del Campo 'Costo' debe ser un número.", 'danger');
          throw "El valor del Campo 'Costo' debe ser un número.";
        }

        hideAlert(modalAlert);
        const result = await updateBook({ Codigo, CodigoInstancia, CostoActual, Descripcion }, token);

        validateStatus(result, modalAlert, async () => {
          modal.classList.remove('d-block');
          return await BookTable(root, token);
        });
      });

      document.querySelector('#deleteBtnModal').addEventListener('click', async () => {
        hideAlert(modalAlert);
        const result = await deleteBooks(Codigo, token);

        validateStatus(result, modalAlert, async () => {
          modal.classList.remove('d-block');
          return await BookTable(root, token);
        });
      });

      document.querySelector('#closeBtnModal').addEventListener('click', () => modal.classList.remove('d-block'));
    });
  });
};

export default BookTable;
