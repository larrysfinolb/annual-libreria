import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';
import BookTable from '../templates/BookTable';

const Books = async (root, token) => {
	const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h2 class="h1">Libros</h2>
				</div>
				<h3 class="h2">Añade un Nuevo Libro</h3>
				<section class="mb-3 d-flex flex-column gap-2">
					<h3 class="h2">Lista de Todos los Libros</h3>
					<div class="table-responsive" id="table"></div>
				</section>
			</main>
		</div>
	</div>
    `;
	root.innerHTML = view;
	await Header(document.querySelector('#header'));
	await SidebarMenu(document.querySelector('#menu'));
	await BookTable(document.querySelector('#table'), token);
};

export default Books;
