const Select = ({ labelValue, options, inputValue, col, id }) => {
  const label = document.createElement('label');
  label.className = 'form-label';
  label.setAttribute('for', id);
  label.textContent = labelValue;

  const select = document.createElement('select');
  select.className = `form-select`;
  select.id = id;
  select.name = id;

  const allOptions = [];

  const optionDefault = document.createElement('option');
  optionDefault.textContent = 'Selecciona';
  allOptions.push(optionDefault);

  options.map(option => {
    const optionNode = document.createElement('option');
    optionNode.textContent = option.Descripcion;
    optionNode.value = option.Codigo;
    if (inputValue === option.Codigo) optionNode.selected = 'selected';
    allOptions.push(optionNode);
  });

  select.append(...allOptions);

  const wrap = document.createElement('div');
  wrap.className = `col-${col}`;
  wrap.append(label, select);

  return wrap;
};

export { Select };
