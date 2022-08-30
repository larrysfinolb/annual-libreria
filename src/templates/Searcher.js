const Searcher = async (root, tbody) => {
	const view = `
	<input type="text" id="searcher" class="mb-2 form-control" placeholder="Buscador...">
    `;
	root.innerHTML = view;

	const searcher = document.querySelector('#searcher');
	searcher.addEventListener('keyup', () => {
		const value = searcher.value.toLowerCase().trim();
		for (const row of tbody.children) {
			let match = false;
			for (const col of row.children) {
				if (col.innerHTML.toLowerCase().indexOf(value) > -1) {
					match = true;
					break;
				}
			}
			if (match) row.classList.remove('d-none');
			else row.classList.add('d-none');
		}
	});
};

export default Searcher;
