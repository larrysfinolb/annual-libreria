import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import { HeaderContent } from '../components/HeaderContent';
import { Table } from '../components/Table';
import { createBookcases, deleteBookcases, getAllBookcases, updateBookcases } from '../utils/api';
import { Alert } from '../components/Alert';
import validateStatus from '../utils/validateStatus';

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

  let props = {};
  let inputs = [];
  const callBacks = {
    create: createBookcases,
    delete: deleteBookcases,
    update: updateBookcases,
  };

  const section = document.querySelector('#section');
  const allNodes = [];

  await Header(document.querySelector('#header'));
  await SidebarMenu(document.querySelector('#menu'));

  // Creamos el Encabezado del contenido
  // Creamos los inputs del formulario de agregar
  inputs = [
    { labelValue: 'Código', id: 'Codigo', type: 'text', col: 12 },
    { labelValue: 'Descripción', id: 'Descripcion', type: 'text', col: 6 },
    { labelValue: 'Activo', id: 'Activo', type: 'radio', options: ['Si', 'No'], optionDefault: 'Si', col: 6 },
  ];

  props = { title: 'Estantes', inputs };
  allNodes.push(HeaderContent(props, callBacks, Bookcases, token));

  // Creamos la alerta de error
  props = { id: 'alert', style: 'danger' };
  const alert = Alert(props);
  allNodes.push(alert);

  // Creamos la tabla
  const bookcases = await getAllBookcases(token);
  validateStatus(bookcases, alert, 'Estantes cargados.', () => {
    const newBookcases = bookcases.Data.map(bookcase => {
      return { Fila: bookcase.Fila, ...bookcase };
    });
    inputs = [
      { labelValue: 'Código', id: 'Codigo', type: 'text', col: 12, readonly: true },
      { labelValue: 'Descripción', id: 'Descripcion', type: 'text', col: 6 },
      { labelValue: 'Activo', id: 'Activo', type: 'radio', options: ['Si', 'No'], col: 6 },
    ];
    props = { cols: ['Fila', 'Código', 'Descripción', 'Activo'], rows: newBookcases, inputs };
    allNodes.push(Table(props, callBacks, Bookcases, token));
  });

  // Agregamos todo el contenido a la sección
  section.append(...allNodes);
};

export { Bookcases };
