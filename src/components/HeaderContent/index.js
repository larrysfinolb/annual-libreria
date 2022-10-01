import { AddBtnEvent } from './events';

const HeaderContent = ({ title, inputs }, callBacks, refreshTable, token) => {
  // Creamos el título
  const h2 = document.createElement('h2');
  h2.className = 'h1';
  h2.textContent = title;

  // Creamos el botón de agregar
  const addBtn = document.createElement('button');
  addBtn.className = 'btn btn-sm btn-outline-secondary';
  addBtn.type = 'button';
  addBtn.textContent = 'Agregar';

  // Creamos el botón de exportar
  /*const exportBtn = document.createElement('button');
  exportBtn.className = 'btn btn-sm btn-outline-secondary';
  exportBtn.type = 'button';
  exportBtn.textContent = 'Exportar';*/

  // Creamos el contenedor de los botones
  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  btnGroup.append(addBtn);

  // Creamos el contenedor
  const container = document.createElement('div');
  container.className = 'd-flex justify-content-between align-items-center py-2 mb-2 border-bottom';

  container.append(h2, btnGroup);

  AddBtnEvent(addBtn, inputs, callBacks, refreshTable, token);

  // exportBtn.addEventListener('click', () => {
  //   console.log('exportar');
  // });

  return container;
};

export { HeaderContent };
