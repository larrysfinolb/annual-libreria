function Login(root) {
	const view = `
    <header></header>
    <main>
        <section>
            <form>
                <h1>Inicio de Sesion</h1>
                <input type="text">
            </form>
        </section>
    </main>    
    `;
	root.innerHTML = view;
}

module.exports = Login;
