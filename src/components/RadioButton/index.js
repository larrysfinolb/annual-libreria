const RadioButton = ({ labelValue, options, optionDefault, col }) => {
  const label = document.createElement('label');
  label.className = 'form-label';
  label.textContent = labelValue;

  const allOptions = options.map(option => {
    const div = document.createElement('div');
    div.className = 'form-check';

    const input = document.createElement('input');
    input.className = 'form-check-input';
    input.type = 'radio';
    input.name = labelValue;
    input.id = option;
    if (option === optionDefault) input.checked = true;

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.setAttribute('for', option);
    label.textContent = option;

    div.append(input, label);
    return div;
  });

  const container = document.createElement('div');
  container.className = 'form-control d-flex gap-3 px-0 border-0';
  container.append(...allOptions);

  const wrap = document.createElement('div');
  wrap.className = `col-${col}`;
  wrap.append(label, container);

  return wrap;
};

export { RadioButton };
