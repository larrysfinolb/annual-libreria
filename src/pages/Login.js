function Login(root) {
	const view = `
    <header></header>
    <main>
        <section>
            <form>
                <div class="container">
                    <div class="mb-3">
                        <label for="formGroupExampleInput" class="form-label fw-bold">Correo Electronico</label>
                        <input type="email" class="form-control" id="formGroupExampleInput" placeholder="Ingresa tu correo asociado">
                    </div>
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label fw-bold">Contraseña</label>
                        <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="Ingresa tu contraseña">
                    </div>
                    <button class="btn btn-primary w-100 fw-bold">Iniciar</button>
                </div>
            </form>
        </section>
    </main>    
    `;
	root.innerHTML = view;
}

module.exports = Login;
