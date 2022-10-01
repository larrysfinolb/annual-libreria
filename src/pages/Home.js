import { Header } from '../components/Header';
import { SidebarMenu } from '../components/SidebarMenu';

const Home = async root => {
  const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex flex-column align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h2 class="display-2 text-center fw-bold text-uppercase">Annual Librería</h2>
					<p class="lead">Bienvenido a Annual Librería, la aplicación web con la que podrás llevar el control de todos los procesos de tu librería de una forma fácil y segura, permitiéndote gestionar tus estantes, tu inventario, los libros que tienes disponibles en inventario junto al almacén donde se encuentran, y como no, también tus clientes. Todo esto a partir de una interactiva y sencilla interfaz de usuario.</p>
				</div>
			</main>
		</div>
	</div>
    `;
  root.innerHTML = view;
  await Header(document.querySelector('#header'));
  await SidebarMenu(document.querySelector('#menu'));
};

export { Home };
