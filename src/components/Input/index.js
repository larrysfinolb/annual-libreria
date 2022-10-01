const Input = ({ labelValue, inputValue, placeholder, type, id, col, readonly }) => {
  const label = document.createElement('label');
  label.className = 'form-label';
  label.setAttribute('for', id);
  label.textContent = labelValue;

  const input = document.createElement('input');
  input.className = 'form-control';
  input.name = id;
  input.id = id;
  input.type = type;
  input.required = true;
  if (placeholder) input.placeholder = placeholder;
  if (inputValue) input.value = inputValue;
  if (readonly) input.readOnly = true;

  const wrap = document.createElement('div');
  wrap.className = `col-${col}`;
  wrap.append(label, input);

  return wrap;
};

export { Input };
