function Login(root) {
	const view = `
    <header></header>
    <main>
        <section>
            <form>
                <body>
            <div class="container mt-5">
                    <div class="row"> 
                        
                        <div class="col-md-3">
                            <h1>Ingrese datos del cliente</h1>
                                <form action="insertar.php" method="POST">

                                    <input type="text" class="form-control mb-3" name="cod_cliente" placeholder="cod cliente">
                                    <input type="text" class="form-control mb-3" name="Cedula" placeholder="Cedula">
                                    <input type="text" class="form-control mb-3" name="nombres" placeholder="Nombres">
                                    <input type="text" class="form-control mb-3" name="apellidos" placeholder="Apellidos">
                                    
                                    <input type="submit" class="btn btn-primary">
                                </form>
                        </div>

                        <div class="col-md-8">
                            <table class="table" >
                                <thead class="table-success table-striped" >
                                    <tr>
                                        <th>Código</th>
                                        <th> Cédula</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                      
                                    <tr>
                                        <th><?php  echo $row['cod_estudiante']?></th>
                                        <th><?php  echo $row['dni']?></th>
                                        <th><?php  echo $row['nombres']?></th>
                                        <th><?php  echo $row['apellidos']?></th>    
                                        <th><a href="actualizar.php?id=<?php echo $row['cod_estudiante'] ?>" class="btn btn-info">Editar</a></th>
                                        <th><a href="delete.php?id=<?php echo $row['cod_estudiante'] ?>" class="btn btn-danger">Eliminar</a></th>                                        
                                    </tr>
                               
                                        
                                </tbody>
                            </table>
                        </div>
                    </div>  
            </div>
    </body>
</html>
</form>
</section>
</main> 
` ;
	root.innerHTML = view;
}
module.exports = Login;