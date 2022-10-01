import { Alert } from '../components/Alert';
import { HeaderContent } from '../components/HeaderContent';
import { Table } from '../components/Table';
import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import {
  createInventoryInstance,
  deleteInventoryInstance,
  getAllInventoryInstances,
  updateInventoryInstance,
} from '../utils/api';
import validateStatus from '../utils/validateStatus';

const InventoryInstances = async (root, token) => {
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
    create: createInventoryInstance,
    delete: deleteInventoryInstance,
    update: updateInventoryInstance,
  };

  const section = document.querySelector('#section');
  const allNodes = [];

  await Header(document.querySelector('#header'));
  await SidebarMenu(document.querySelector('#menu'));

  // Creamos el Encabezado de contendio
  // Creamos los inputs del formulario de agregar
  inputs = [{ labelValue: 'Descripción', id: 'Descripcion', type: 'text', col: 12 }];

  props = { title: 'Instancias de inventario', inputs };
  allNodes.push(HeaderContent(props, callBacks, InventoryInstances, token));

  // Creamos la alerta de error
  props = { id: 'alert', style: 'danger' };
  const alert = Alert(props);
  allNodes.push(alert);

  // Creamos la tabla
  const inventoryInstances = await getAllInventoryInstances(token);
  validateStatus(inventoryInstances, alert, 'Instancias de inventario cargadas.', () => {
    const newInventoryInstances = inventoryInstances.Data.map(instance => {
      return { Fila: instance.Fila, ...instance };
    });
    inputs = [
      { labelValue: 'Código', id: 'Codigo', type: 'text', col: 6, readonly: true },
      { labelValue: 'Descripción', id: 'Descripcion', type: 'text', col: 6 },
    ];
    props = { cols: ['Fila', 'Código', 'Descripción', 'Cantidad de productos'], rows: newInventoryInstances, inputs };
    allNodes.push(Table(props, callBacks, InventoryInstances, token));
  });

  // Agregamos todo el contenido a la sección
  section.append(...allNodes);
};

export default InventoryInstances;
