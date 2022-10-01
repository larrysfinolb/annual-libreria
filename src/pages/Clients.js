import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import ClientsTable from '../templates/ClientsTable';
import { hideAlert, showAlert } from '../utils/alert';
import validateStatus from '../utils/validateStatus';
import { createClient, deleteClient, getAllClients, updateClient } from '../utils/api';
import { HeaderContent } from '../components/HeaderContent';
import { Table } from '../components/Table';
import { Alert } from '../components/Alert';

const Clients = async (root, token) => {
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
  const callBacks = { create: createClient, delete: deleteClient, update: updateClient };

  const section = document.querySelector('#section');
  const allNodes = [];

  await Header(document.querySelector('#header'));
  await SidebarMenu(document.querySelector('#menu'));

  // Creamos el Encabezado del contenido
  // Creamos los inputs del formulario de agregar
  inputs = [
    { labelValue: 'Código', id: 'Codigo', type: 'text', col: 6 },
    { labelValue: 'Nombre', id: 'Descripcion', type: 'text', col: 6 },
    { labelValue: 'ID Fiscal', id: 'IdFiscal', type: 'text', col: 6 },
    { labelValue: 'Activo', id: 'Activo', type: 'radio', options: ['Si', 'No'], optionDefault: 'Si', col: 6 },
  ];

  props = { title: 'Clientes', inputs };
  allNodes.push(HeaderContent(props, callBacks, Clients, token));

  // Creamos la alerta de error
  props = { id: 'alert', style: 'danger' };
  const alert = Alert(props);
  allNodes.push(alert);

  // Creamos la tabla
  const clients = await getAllClients(token);
  validateStatus(clients, alert, 'Clientes cargados.', () => {
    const newClients = clients.Data.map(client => {
      return { Fila: client.Fila, ...client };
    });
    inputs = [];
    props = { cols: ['Fila', 'Código', 'Nombre', 'ID Fiscal', 'Activo'], rows: newClients, inputs };
    allNodes.push(Table(props, callBacks, Clients, token));
  });

  // Agregamos todo el contenido
  section.append(...allNodes);
};

export default Clients;
