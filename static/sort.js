document.querySelectorAll('table').forEach(table => {
  table.querySelectorAll('th').forEach((header, index) => {
    let dir = 1;                   // 1 = asc, ‑1 = desc
    header.addEventListener('click', () => {
      const tbody = table.tBodies[0];
      const rows = Array.from(tbody.rows);

      rows.sort((a, b) => {
        const aVal = a.cells[index].textContent.trim();
        const bVal = b.cells[index].textContent.trim();

        // smart type detection
        const dateRE = /^\d{4}-\d{2}-\d{2}$/;
        let result;
        if (dateRE.test(aVal) && dateRE.test(bVal)) {
          result = new Date(aVal) - new Date(bVal);
        } else if (!isNaN(aVal) && !isNaN(bVal)) {
          result = parseFloat(aVal) - parseFloat(bVal);
        } else {
          result = aVal.localeCompare(bVal, undefined, {numeric: true, sensitivity: 'base'});
        }
        return result * dir;
      });

      dir *= -1;
      rows.forEach(row => tbody.appendChild(row));   // re‑attach in new order

      // aria‑sort feedback
      table.querySelectorAll('th').forEach(th => th.removeAttribute('aria-sort'));
      header.setAttribute('aria-sort', dir === 1 ? 'ascending' : 'descending');
    });
  });
});
