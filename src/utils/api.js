const axios = require('axios');

const API = 'http://127.0.0.1:3000/api';

// PROFILE
const loginSaint = async (idUser, password) => {
	const URL = `${API}/profile/login-saint`;

	try {
		const result = await axios.post(URL, { idUser, password });
		return result.data;
	} catch (error) {
		console.log('Error en la API:', error);
	}
};

// BOOKCASES
const getAllBookcases = async (token) => {
	const URL = `${API}/bookcases/get-all`;

	try {
		const result = await axios.post(URL, { token });
		return result.data;
	} catch (error) {
		console.log('Error en la API:', error);
	}
};
const createBookcases = async (deposito, token) => {
	const URL = `${API}/bookcases/create`;

	try {
		const result = await axios.post(URL, { deposito, token });
		return result.data;
	} catch (error) {
		console.log('Error en la API:', error);
	}
};
const updateBookcases = async (deposito, token) => {
	const URL = `${API}/bookcases/update`;

	try {
		const result = await axios.post(URL, { deposito, token });
		return result.data;
	} catch (error) {
		console.log('Error en la API:', error);
	}
};
const deleteBookcases = async (codigoDeposito, token) => {
	const URL = `${API}/bookcases/delete`;

	try {
		const result = await axios.post(URL, { codigoDeposito, token });
		return result.data;
	} catch (error) {
		console.log('Error en la API:', error);
	}
};

module.exports = {
	loginSaint,
	getAllBookcases,
	createBookcases,
	updateBookcases,
	deleteBookcases,
};
