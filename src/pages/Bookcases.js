import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';

const Bookcases = async (root) => {
	const view = `
	<div id="header" class="sticky-top"></div>
	<div class="container-fluid">
		<div id="menu"></div>
		<div class="row">
			<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h2 class="h1">Estantes</h2>
				</div>
				<section class="mb-3 border-bottom d-flex flex-column gap-2">
					<h3 class="h2">Añade un Nuevo Estante</h3>
					<form id="createForm" class="row g-3 w-100 mx-auto">
							<div class="col-sm-6">
								<label for="" class="form-label">Codigo del Estante</label>
								<input type="text" class="form-control" id="" required>
							</div>
							<div class="col-sm-6">
								<label for="" class="form-label">Estado del Estante (Activo)</label>
								<input type="number" class="form-control" id="" step="1" min="0" max="1" required>
							</div>
							<div class="col-12">
								<label for="" class="form-label">Descripcion del Estante</label>
								<input type="text" class="form-control" id="" required>
							</div>
							<div class="col-12">
								<button class="btn btn-dark btn-lg w-100" type="submit">Añadir</button>
							</div>
					</form>
				</section>
				<section>
					<h3 class="h2">Lista de Todos los Estantes</h3>
				</section>
			</main>
		</div>
	</div>
    `;
	root.innerHTML = view;
	await Header(document.querySelector('#header'));
	await SidebarMenu(document.querySelector('#menu'));
};

export default Bookcases;
