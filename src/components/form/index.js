import { Button } from '../Button';

const Form = ({ allInputs }, callBack) => {
  const form = document.createElement('form');
  form.className = 'row g-3';

  let props = {};

  // Creamos el botón cancelar
  props = { value: 'Cancelar', type: 'button', style: 'secondary', col: 12 };
  const cancelButton = Button(props, () => document.querySelector('#modal').classList.remove('d-block'));

  form.append(...allInputs, cancelButton);

  form.addEventListener('submit', e => {
    e.preventDefault();
    callBack();
  });

  return form;
};

export { Form };
