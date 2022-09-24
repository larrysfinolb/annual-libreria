const Alert = async (props, parent) => {
  const div = document.createElement('div');
  div.classList.add('alert');
  div.classList.add(`alert-${props.type}`);
  div.classList.add('d-flex');
  div.classList.add('align-items-center');
  div.classList.add('d-none');
  div.id = props.id;
  div.setAttribute('role', 'alert');

  parent.append(div);
};

export { Alert };
