import { validateStatus } from '../../utils/validateStatus';
import { Button } from '../Button';
import { Form } from '../Form';
import { Input } from '../Input';
import { RadioButton } from '../RadioButton';

const RowEvent = ({ tr, row }, callBacks, token) => {
  tr.addEventListener('click', () => {
    let props = {};

    const allInputs = [];
    for (const key in row) {
      if (key !== 'Activo') {
        let readOnly = false;
        if (key === 'Fila' || key === 'Codigo') readOnly = true;

        const type = key === 'Fila' ? 'number' : 'text';

        props = { labelValue: key, inputValue: row[key], type, id: key, col: 6, readOnly };
        allInputs.push(Input(props));
      } else {
        const optionDefault = row[key] === 0 ? 'No' : 'Si';

        props = { labelValue: key, options: ['Si', 'No'], optionDefault, col: 6 };
        allInputs.push(RadioButton(props));
      }
    }

    props = { value: 'Actualizar', type: 'submit', style: 'dark', col: 6 };
    allInputs.push(Button(props));

    props = { value: 'Eliminar', type: 'button', style: 'danger', col: 6 };
    allInputs.push(
      Button(props, async () => {
        const result = await callBacks['delete'](row['Codigo'], token);
        validateStatus(result, 'Actualización exitosa.', () => {
          tr.remove();
        });
        modal.classList.remove('d-block');
      })
    );

    const modal = document.querySelector('#modal');

    // Creamos el formulario
    props = { allInputs };
    modal.querySelector('.modal-body').replaceChildren(Form(props, callBacks['form']));

    // Mostramos el modal
    modal.classList.add('d-block');
  });
};

export { RowEvent };
