const Table = async (props, parent) => {
  const div = document.createElement('div');

  div.innerHTML = `
    <div class="d-flex mb-2">
      <input type="text" id="searcher" class="form-control" placeholder="¿Qué deseas buscar?">
      ${!props.select ? '' : `s`}
    </div>
    <table class="table table-sm table-hover col-12">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          ${props.cols.map(col => `<th scope="col">${col}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${props.rows
          .map(row => {
            return `
              <tr>
                <th scope="row">${row.Fila}</th>
                <td>${row.Codigo}</td>
                <td>${row.Descripcion}</td>
                <td>${row.Activo}</td>
              </tr>
            `;
          })
          .join('')}
      </tbody>
    </table>
  `;

  parent.append(div);
};

export { Table };
