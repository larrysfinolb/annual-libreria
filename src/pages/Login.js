function Login(root) {
	const view = `
   
    <header></header>
    <main>
        <section>
            <form>

            <div class="container w-75 bg-light mt-5 rounded shadow">
            <div class="row align-items-md-stretch">
                <div class="col bg">

            </div>
            <div class="col">
            <div class="text-end">
                <img src="img/fl.jpg" width="48" alt=""> 
            </div>

            <h2 class="fw-bold text-center py-5">Bienvenido</h2>

            <!--LOGIN-->

            <form action="#">
                <div class="md-4">
                    <label for ="email" class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" name="email">
                </div>

                <div class="md-4">
                    <label for ="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" name="email">
                </div>

                <div class="md-4 form-check">
                    <input type="checkbox" name="connected" class="form-check-input">
                    <label for="connected" class="form-check-label">Mantenerme conectado</label>
                </div>
                     
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                </div>

                <div class="my-3">
                    <span>¿No tienes cuenta? <a href="#">Regístrate</a></span><br>
                    <span><a href="#">Recuperar Contraseña</a></span>
                </div>
            </form>
        </div>
    </div>
</div>
		

                
        
            </form>
        </section>
    </main>    
    `;
	root.innerHTML = view;
}

module.exports = Login;
