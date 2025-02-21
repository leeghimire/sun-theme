document.querySelectorAll('th').forEach((header, index) => {
  let sortDirection = 1;
  header.addEventListener('click', () => {
    const tbody = document.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => {
      const aVal = a.cells[index].textContent.trim();
      const bVal = b.cells[index].textContent.trim();
      if (index === 0) {
        return (new Date(aVal) - new Date(bVal)) * sortDirection;
      }
      if (index === 2) {
        return (parseInt(aVal) - parseInt(bVal)) * sortDirection;
      }
      return aVal.localeCompare(bVal) * sortDirection;
    });
    sortDirection *= -1;
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
  });
});
