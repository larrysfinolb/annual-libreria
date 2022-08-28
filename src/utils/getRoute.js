const getRoute = () => {
	const hash = window.location.hash;
	if (hash === '') return '/';

	const route = `/${hash.slice(1)}`;

	return route;
};

module.exports = getRoute;
