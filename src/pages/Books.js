import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import BooksTable from '../templates/BooksTable';
import { hideAlert, showAlert } from '../utils/alert';
import {
  createBook,
  deleteBooks,
  getAllBookcases,
  getAllBooksByBookcases,
  getAllInventoryInstances,
  updateBook,
} from '../utils/api';
import validateStatus from '../utils/validateStatus';
import { HeaderContent } from '../components/HeaderContent';
import { Alert } from '../components/Alert';
import { Table } from '../components/Table';

const Books = async (root, token) => {
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

  let props = {};
  let inputs = [];
  const callBacks = { create: createBook, delete: deleteBooks, update: updateBook, getAll: getAllBooksByBookcases };

  const section = document.querySelector('#section');
  const allNodes = [];

  await Header(document.querySelector('#header'));
  await SidebarMenu(document.querySelector('#menu'));

  // Creamos el Encabezado del contenido
  // Creamos los inputs del formulario de agregar
  inputs = [
    { labelValue: 'Código', id: 'Codigo', type: 'text', col: 6 },
    { labelValue: 'Codigo de instancia', id: 'CodigoInstancia', type: 'select', col: 6 },
    { labelValue: 'Descripción', id: 'Descripcion', type: 'text', col: 6 },
    {
      labelValue: 'Costo',
      id: 'Costo',
      type: 'number',
      min: 0,
      step: 0.001,
      col: 6,
    },
  ];

  props = { title: 'Libros', inputs };
  allNodes.push(HeaderContent(props, callBacks, Books, token));

  // Creamos la alerta de error
  props = { id: 'alert', style: 'danger' };
  const alert = Alert(props);
  allNodes.push(alert);

  // Creamos la tabla
  const bookcases = await getAllBookcases(token);
  validateStatus(bookcases, alert, 'Libros cargados.', () => {
    inputs = [
      { labelValue: 'Códgio', id: 'Codigo', type: 'text', col: 6, readonly: true },
      {
        labelValue: 'Costo',
        id: 'Costo',
        type: 'number',
        min: 0,
        step: 0.001,
        col: 6,
      },
      { labelValue: 'Descripción', id: 'Descripcion', type: 'text', col: 12 },
      {
        labelValue: 'Código de instancia',
        id: 'CodigoInstancia',
        type: 'select',
        col: 12,
      },
    ];
    props = {
      cols: ['Fila', 'Código', 'Código de instancia', 'Descripción', 'Costo'],
      rows: [],
      inputs,
      select: bookcases.Data,
    };
    allNodes.push(Table(props, callBacks, Books, token));
  });

  // Agregamos todo el contenido a la sección
  section.append(...allNodes);
};

export default Books;
