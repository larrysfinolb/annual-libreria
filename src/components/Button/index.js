const Button = async ({ value, type, style, col }, callback) => {
  const button = document.createElement('button');
  button.textContent = value;
  button.type = type;
  button.className = `w-100 btn btn-${style}`;

  if (callback) button.addEventListener('click', callback);

  const wrap = document.createElement('div');
  wrap.className = `col-${col}`;
  wrap.append(button);

  return wrap;
};

export { Button };
