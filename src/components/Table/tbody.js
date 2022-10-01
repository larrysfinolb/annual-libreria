import { RowEvent } from './events';

const TBody = ({ rows, inputs }, callBacks, refreshTable, token) => {
  let props = {};
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

    props = { tr, row, inputs };
    RowEvent(props, callBacks, refreshTable, token);

    tr.append(...allTd);
    return tr;
  });
  return allTr;
};

export { TBody };
