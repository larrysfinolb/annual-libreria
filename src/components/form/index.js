import { Button } from '../Button';
import { Input } from '../Input';
import { RadioButton } from '../RadioButton';
import { removeAccents } from '../../utils/removeAccents';
import { validateStatus } from '../../utils/validateStatus';
import { Select } from '../Select';

const Form = ({ colPrimary, colCancel, inputs, btn }, callBack, refreshTable, token) => {
  const modal = document.querySelector('#modal');
  const alert = document.querySelector('#alert');

  let props = {};

  // Creamos todos los inputs
  const allInputs = inputs.map(input => {
    if (input.type === 'radio') {
      return RadioButton(input);
    } else if (input.type === 'select') {
      return Select(input);
    } else {
      return Input(input);
    }
  });

  if (btn) allInputs.push(btn);

  // Creamos el botón de confirmar
  props = { value: 'Confirmar', type: 'submit', style: 'dark', col: colPrimary };
  const primaryButton = Button(props);

  // Creamos el botón de cancelar
  props = { value: 'Cancelar', type: 'button', style: 'secondary', col: colCancel };
  const cancelButton = Button(props, () => {
    document.querySelector('#modal').classList.remove('d-block');
  });

  const form = document.createElement('form');
  form.className = 'row g-3';

  form.append(...allInputs, primaryButton, cancelButton);

  form.addEventListener('submit', async e => {
    e.preventDefault();

    let values = {};
    inputs.map(input => {
      const name_ = removeAccents(input.id);
      let value;

      if (name_ === 'Activo') {
        const options = [...document.querySelectorAll(`input[name=${name_}`)];
        value = options[0].checked ? 1 : 0;
      } else if (name_ === 'CodigoInstancia') {
        value = document.querySelector(`select[name=${name_}]`).value;
      } else {
        value = document.querySelector(`input[name=${name_}]`).value;
      }

      values[name_] = value;
    });

    const result = await callBack(values, token);
    validateStatus(result, alert, 'Operación exitosa.', () => {
      refreshTable(document.querySelector('#root'), token);
    });
    modal.classList.remove('d-block');
  });

  return form;
};

export { Form };
