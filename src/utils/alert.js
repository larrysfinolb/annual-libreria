const showAlert = (alert, message, type) => {
	if (type === 'danger') {
		alert.classList.remove('alert-success');
		alert.classList.add('alert-danger');
	} else if (type === 'success') {
		alert.classList.remove('alert-danger');
		alert.classList.add('alert-success');
	}

	alert.innerHTML = message;
	alert.classList.remove('invisible');
};
const hideAlert = (alert) => {
	alert.classList.add('invisible');
};

module.exports = {
	showAlert,
	hideAlert,
};
