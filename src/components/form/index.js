const Form = async (props, parent) => {
  const div = document.createElement('div');

  div.innerHTML = `
    <form class="row g-3">
      ${props.inputs
        .map(input => {
          if (input.type !== 'radio') {
            return `
            <div class="col-sm-6">
              <label for="${input.name}" class="form-label">${input.name}</label>
              <input type="${input.type}" class="form-control" id="${input.name} name=""" required>
						</div>`;
          } else {
            return `
              <div class="col-sm-6">
                ${input.names
                  .map(name => {
                    return `
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radio" id="${name}" value="${
                      name === 'Activo' ? 1 : 0
                    }" ">
                        <label class="form-check-label" for="${name}">${name}</label>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
              `;
          }
        })
        .join('')}
        <div class="col-12">
				  <button class="btn btn-dark w-100" type="submit" id="primaryBtn">${props.type}</button>
        </div>
        <div class="col-12">
				  <button class="btn btn-secondary w-100" type="button" id="cancelBtn">Cancelar</button>
        </div>
    </form>
  `;

  parent.innerHTML = '';
  parent.append(div);

  const primaryBtn = document.querySelector('#primaryBtn');
  const cancelBtn = document.querySelector('#cancelBtn');
  const modal = document.querySelector('#modal');

  cancelBtn.addEventListener('click', () => modal.classList.remove('d-block'));
};

export { Form };
