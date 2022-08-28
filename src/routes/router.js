import Home from '../pages/Home';
import Bookcases from '../pages/Bookcases';
import Books from '../pages/Books';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import getRoute from '../utils/getRoute';

const router = async () => {
	const route = getRoute();

	const root = document.getElementById('root');

	switch (route) {
		case '/':
			await Home(root);
			break;
		case '/bookcases':
			await Bookcases(root);
			break;
		case '/books':
			await Books(root);
			break;
		case '/clients':
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
