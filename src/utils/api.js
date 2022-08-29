const axios = require('axios');

const API = 'http://127.0.0.1:3000/api';

// PROFILE
const loginSaint = async (idUser, password) => {
	const URL = `${API}/profile/login-saint`;

	try {
		const result = await axios.post(URL, { idUser, password });
		return result.data;
	} catch (error) {
		console.log('Error in the API:', error);
	}
};

// BOOKCASES
const getAllBookcases = async (token) => {
	const URL = `${API}/bookcases/get-all`;

	try {
	} catch (error) {
		console.log('Error in the API:', error);
	}
};
const createBookcases = async (deposito, token) => {
	const URL = `${API}/bookcases/create`;

	try {
	} catch (error) {
		console.log('Error in the API:', error);
	}
};

module.exports = {
	loginSaint,
	getAllBookcases,
	createBookcases,
};
