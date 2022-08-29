const showSpinner = () => {
	const spinner = document.querySelector('#spinner');
	spinner.classList.remove('d-none');
};

const hideSpinner = () => {
	const spinner = document.querySelector('#spinner');
	spinner.classList.add('d-none');
};

module.exports = {
	showSpinner,
	hideSpinner,
};
