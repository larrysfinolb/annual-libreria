import hostname from './hostname';

const logout = () => {
	window.localStorage.removeItem('token');
	window.location.href = `${hostname}/#login`;
};

export default logout;
