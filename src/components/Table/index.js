import { RowEvent } from './events';

const Table = ({ cols, rows }, callBacks, token) => {
  // div.innerHTML = `
  //   <div class="d-flex mb-2">
  //     ${!props.select ? '' : `s`}
  //   </div>
  // `;

  // RENDERIZADO
  // Buscador
  const searcher = document.createElement('input');
  searcher.className = 'form-control';
  searcher.placeholder = '¿Qúe deseas buscar?';

  // Desplegable

  // Contenedor del buscador y del desplegable
  const container = document.createElement('div');
  container.className = 'd-flex mb-3';
  container.append(searcher);

  // Header de la tabla con sus columnas
  const thead = document.createElement('thead');
  thead.className = 'table-dark';
  const tr = document.createElement('tr');
  const allTh = cols.map(col => {
    const th = document.createElement('th');
    th.textContent = col;
    return th;
  });
  tr.append(...allTh);
  thead.append(tr);

  // Body de la tabla con sus filas
  const tbody = document.createElement('tbody');
  const allTr = rows.map(row => {
    const tr = document.createElement('tr');
    const allTd = [];
    for (const col in row) {
      const td = document.createElement('td');
      if (col !== 'Activo') {
        td.textContent = row[col];
      } else {
        td.textContent = row[col] === 0 ? 'No' : 'Si';
      }
      allTd.push(td);
    }
    tr.append(...allTd);

    const props = { tr, row };
    RowEvent(props, callBacks, token);

    return tr;
  });
  tbody.append(...allTr);

  // Tabla
  const table = document.createElement('table');
  table.className = 'table table-sm table-hover';
  table.append(thead, tbody);

  // Contenedor padre
  const wrap = document.createElement('div');
  wrap.append(container, table);

  // Evento del Buscador
  searcher.addEventListener('keyup', () => {
    const value = searcher.value.toLowerCase();
    for (const row of tbody.children) {
      const match = false;
      for (const col of row.children) {
        const content = col.textContent.toLocaleLowerCase();
        if (content.indexOf(value) > -1) {
          match = true;
          break;
        }
      }
      if (match) row.classList.remove('d-none');
      else row.classList.add('d-none');
    }
  });

  return wrap;
};

export { Table };
