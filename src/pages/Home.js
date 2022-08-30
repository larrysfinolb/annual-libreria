import Header from '../templates/Header';
import SidebarMenu from '../templates/SidebarMenu';

const Home = async (root) => {
	const view = `
    `;
	root.innerHTML = view;
	await Header(document.querySelector('#header'));
	await SidebarMenu(document.querySelector('#menu'));
};

export default Home;
