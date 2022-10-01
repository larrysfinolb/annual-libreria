import { validateStatus } from '../../utils/validateStatus';
import { Button } from '../Button';
import { Form } from '../Form';
import { TBody } from './tbody.js';

const RowEvent = ({ tr, row, inputs }, callBacks, refreshTable, token) => {
  tr.addEventListener('click', () => {
    const modal = document.querySelector('#modal');

    let props = {};

    inputs = inputs.map(input => {
      if (input.type !== 'radio') {
        return { ...input, inputValue: row[input.id] };
      } else if (input.type === 'select') {
        return { ...input, optionDefault: row[input.id] === 0 ? 'No' : 'Si' };
      }
    });

    // Creamos el botón de eliminar
    props = { value: 'Eliminar', type: 'button', style: 'danger', col: 6 };
    const deleteButton = Button(props, async () => {
      const alert = document.querySelector('#alert');
      const result = await callBacks['delete'](row['Codigo'], token);
      validateStatus(result, alert, 'Registro eliminado.', () => {
        tr.remove();
      });
      modal.classList.remove('d-block');
    });

    // Creamos el formulario
    props = { colPrimary: 6, colCancel: 12, inputs, btn: deleteButton };
    modal.querySelector('.modal-body').replaceChildren(Form(props, callBacks['update'], refreshTable, token));

    // Mostramos el modal
    modal.classList.add('d-block');
  });
};

const SelectEvent = ({ select, inputs }, callBacks, refreshTable, token) => {
  select.addEventListener('change', async () => {
    const alert = document.querySelector('#alert');

    let props = {};

    const result = await callBacks['getAll'](select.value, token);

    validateStatus(result, alert, `Cargados.`, () => {
      const rows = result.Data.map(row => {
        return { Fila: row.Fila, ...row };
      });

      props = { rows, inputs };
      document.querySelector('#tbody').replaceChildren(...TBody(props, callBacks, refreshTable, token));
    });
  });
};

export { RowEvent, SelectEvent };
