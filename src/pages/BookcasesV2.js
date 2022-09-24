import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import BookcasesTable from '../templates/BookcasesTable';
import { createBookcases } from '../utils/api';
import { showAlert, hideAlert } from '../utils/alert';
import validateStatus from '../utils/validateStatus';
import { HeaderContent } from '../Components/HeaderContent';
import { Table } from '../components/Table';
import { getAllBookcases } from '../utils/api';
import { Alert } from '../components/Alert';

const Bookcases = async (root, token) => {
  const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <section id="section"></section>
			</main>
		</div>
	</div>
    `;
  root.innerHTML = view;
  const section = document.querySelector('#section');

  await Header(document.querySelector('#header'));
  await SidebarMenu(document.querySelector('#menu'));

  const inputs = [
    { type: 'text', name: 'Código' },
    { type: 'text', name: 'Descripción' },
    { type: 'radio', names: ['Activo', 'Inactivo'] },
  ];
  await HeaderContent({ title: 'Estantes', inputs }, section);

  await Alert({ type: 'danger', id: 'tableAlert' }, section);

  const bookcases = await getAllBookcases(token);
  const tableAlert = document.querySelector('#tableAlert');
  validateStatus(
    bookcases,
    tableAlert,
    async () => await Table({ cols: ['Código', 'Descripción', 'Activo'], rows: bookcases.Data }, section)
  );

  // try {
  //   const formAlert = document.querySelector('#formAlert');
  //   const createForm = document.querySelector('#createForm');

  //   createForm.addEventListener('submit', async e => {
  //     e.preventDefault();

  //     const Activo = document.querySelector('#activo').value || 0;
  //     const Codigo = document.querySelector('#codigo').value || '';
  //     const Descripcion = document.querySelector('#descripcion').value || '';

  //     if (isNaN(Number(Activo))) {
  //       showAlert(formAlert, "El valor del Campo 'Activo' debe ser un número.", 'danger');
  //       throw "El valor del Campo 'Activo' debe ser un número.";
  //     }

  //     hideAlert(formAlert);
  //     const result = await createBookcases({ Activo, Codigo, Descripcion }, token);

  //     validateStatus(result, formAlert, async () => {
  //       showAlert(formAlert, 'El Estante ha sido añadido.', 'success');
  //       createForm.reset();
  //       await BookcasesTable(document.querySelector('#table'), token);
  //     });
  //   });
  // } catch (error) {
  //   console.error('Error', error);
  // }
};

export default Bookcases;
