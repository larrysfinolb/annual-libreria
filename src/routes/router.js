import Home from '../pages/Home';
import Bookcases from '../pages/Bookcases';
import InventoryInstances from '../pages/InventoryInstances';
import Books from '../pages/Books';
import Clients from '../pages/Clients';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import getRoute from '../utils/getRoute';
import hostname from '../utils/hostname';

const router = async () => {
	const route = getRoute();
	const token = window.localStorage.getItem('token');

	if (route !== '/login' && !token) window.location.href = `${hostname}/#login`;
	else if (route === '/login' && token) window.location.href = `${hostname}/#`;

	const root = document.getElementById('root');

	switch (route) {
		case '/':
			await Home(root);
			break;
		case '/bookcases':
			await Bookcases(root, token);
			break;
		case '/inventory-instances':
			await InventoryInstances(root, token);
			break;
		case '/books':
			await Books(root, token);
			break;
		case '/clients':
			await Clients(root, token);
			break;
		case '/login':
			await Login(root);
			break;
		default:
			await NotFound(root);
			break;
	}
};

export default router;
