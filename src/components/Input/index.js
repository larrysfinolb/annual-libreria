const Input = ({ labelValue, inputValue, placeholder, type, id, col }) => {
  const label = document.createElement('label');
  label.className = 'form-label';
  label.setAttribute('for', id);
  label.textContent = labelValue;

  const input = document.createElement('input');
  input.className = 'form-control';
  input.id = id;
  input.type = type;
  input.required = true;
  if (placeholder) input.placeholder = placeholder;
  if (inputValue) input.value = inputValue;

  const wrap = document.createElement('div');
  wrap.className = `col-${col}`;
  wrap.append(label, input);

  return wrap;
};

export { Input };
