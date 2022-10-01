import { Form } from '../Form';

const AddBtnEvent = (addBtn, inputs, callBacks, refreshTable, token) => {
  addBtn.addEventListener('click', () => {
    const modal = document.querySelector('#modal');

    let props = { colPrimary: 6, colCancel: 6, inputs };
    modal.querySelector('.modal-body').replaceChildren(Form(props, callBacks['create'], refreshTable, token));

    // Mostramos el modal
    modal.classList.add('d-block');
  });
};

export { AddBtnEvent };
