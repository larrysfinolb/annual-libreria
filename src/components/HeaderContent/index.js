import { Form } from '../form';

const HeaderContent = async (props, parent) => {
  const div = document.createElement('div');
  div.classList.add('d-flex');
  div.classList.add('justify-content-between');
  div.classList.add('align-items-center');
  div.classList.add('py-2');
  div.classList.add('mb-3');
  div.classList.add('border-bottom');

  div.innerHTML = `
  <h2 class="h1">${props.title}</h2>
    <div class="btn-group">
      <button type="button" class="btn btn-sm btn-outline-secondary" id="addBtn">Agregar</button>
      <button type="button" class="btn btn-sm btn-outline-secondary" id="exportBtn">Exportar</button>
    </div>
  `;

  parent.append(div);

  const addBtn = document.querySelector('#addBtn');
  const exportBtn = document.querySelector('#exportBtn');
  const modal = document.querySelector('#modal');

  addBtn.addEventListener('click', async () => {
    await Form({ inputs: props.inputs, type: 'Agregar' }, modal.querySelector('.modal-body'));
    modal.classList.add('d-block');
  });

  exportBtn.addEventListener('click', () => {
    console.log('exportar');
  });
};

export { HeaderContent };
