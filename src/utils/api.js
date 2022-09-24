const axios = require('axios');
const { showSpinner, hideSpinner } = require('./spinner');

const API = 'https://protected-reaches-09504.herokuapp.com/api';

// PROFILE
export const loginSaint = async (idUser, password) => {
  const URL = `${API}/profile/login-saint`;

  try {
    showSpinner();
    const result = await axios.post(URL, { idUser, password });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};

// BOOKCASES
export const getAllBookcases = async token => {
  const URL = `${API}/bookcases/get-all`;

  try {
    showSpinner();
    const result = await axios.post(URL, { token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const createBookcases = async (deposito, token) => {
  const URL = `${API}/bookcases/create`;

  try {
    showSpinner();
    const result = await axios.post(URL, { deposito, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const updateBookcases = async (deposito, token) => {
  const URL = `${API}/bookcases/update`;

  try {
    showSpinner();
    const result = await axios.post(URL, { deposito, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const deleteBookcases = async (codigoDeposito, token) => {
  const URL = `${API}/bookcases/delete`;

  try {
    showSpinner();
    const result = await axios.post(URL, { codigoDeposito, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};

// INVENTORY INSTANCES
export const getAllInventoryInstances = async token => {
  const URL = `${API}/inventory-instances/get-all`;

  try {
    showSpinner();
    const result = await axios.post(URL, { token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const createInventoryInstance = async (instancia, token) => {
  const URL = `${API}/inventory-instances/create`;

  try {
    showSpinner();
    const result = await axios.post(URL, { instancia, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API', error);
  }
};
export const updateInventoryInstance = async (instancia, token) => {
  const URL = `${API}/inventory-instances/update`;

  try {
    showSpinner();
    const result = await axios.post(URL, { instancia, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const deleteInventoryInstance = async (codigoInstancia, token) => {
  const URL = `${API}/inventory-instances/delete`;

  try {
    showSpinner();
    const result = await axios.post(URL, { codigoInstancia, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};

// BOOKS
export const getAllBooksByBookcases = async (codigoDeposito, token) => {
  const URL = `${API}/books/get-all-by-bookcases`;

  try {
    showSpinner();
    const result = await axios.post(URL, { codigoDeposito, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const createBook = async (producto, token) => {
  const URL = `${API}/books/create`;

  try {
    showSpinner();
    const result = await axios.post(URL, { producto, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const updateBook = async (producto, token) => {
  const URL = `${API}/books/update`;

  try {
    showSpinner();
    const result = await axios.post(URL, { producto, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const deleteBooks = async (codigoProducto, token) => {
  const URL = `${API}/books/delete`;

  try {
    showSpinner();
    const result = await axios.post(URL, { codigoProducto, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};

// CLIENTS
export const getAllClients = async token => {
  const URL = `${API}/clients/get-all`;

  try {
    showSpinner();
    const result = await axios.post(URL, { token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const createClient = async (cliente, usuario, token) => {
  const URL = `${API}/clients/create`;

  try {
    showSpinner();
    const result = await axios.post(URL, { cliente, usuario, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const updateClient = async (cliente, usuario, token) => {
  const URL = `${API}/clients/update`;

  try {
    showSpinner();
    const result = await axios.post(URL, { cliente, usuario, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
export const deleteClient = async (codigoCliente, token) => {
  const URL = `${API}/clients/delete`;

  try {
    showSpinner();
    const result = await axios.post(URL, { codigoCliente, token });
    hideSpinner();

    return result.data;
  } catch (error) {
    hideSpinner();
    console.log('Error en la API:', error);
    return error.response.data;
  }
};
