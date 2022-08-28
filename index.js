import router from './src/routes/router';
import './public/styles/main.css';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
