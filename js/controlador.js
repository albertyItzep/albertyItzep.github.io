class Controlador{
    constructor(){
        this.Clientes = new ListaSimple();
        this.Clientes.insertNode('2354168452525'," Oscar Armin",'EDD','admin@gmail.com','12345678','12345678',true);
        this.Actores =  new ABB();
        this.Categorias = new TablaHash(20);
        this.Peliculas = new AVL()
        this.merkle = new MerkleTree()
        this.blockchain = new BlockChain()
        this.actualUsuario = null
        this.actualPelicula = null
    }
    crearBloquesTiempo(){
        
    }
}

let manager = new Controlador();
//------------------------------------------------------------------------ Administrador ------------------------------------------------------------------------

// funciones de Accion
function login(){
    let userName = document.getElementById("userName").value;
    let pass = document.getElementById("pass").value;
    let admino = document.getElementById("adminV").checked;
    
    let validarUser = manager.Clientes.validarUsuario(userName,pass);
    if (validarUser == "success") {
        if (admino) {
            if(manager.Clientes.esAdmin(userName)){
                document.getElementById("adminDashboard").style.display = "block";
                document.getElementById("login").style.display = "none";
                manager.actualUsuario = manager.Clientes.getUsuario(userName);
            }else{
                document.getElementById("normalDashboard").style.display = "block"
                document.getElementById("login").style.display = "none"
                manager.actualUsuario = manager.Clientes.getUsuario(userName);
            }
        }else{
            document.getElementById("normalDashboard").style.display = "block"
            document.getElementById("login").style.display = "none"
            manager.actualUsuario = manager.Clientes.getUsuario(userName);
        }
    }else{
        alert(validarUser);
    }
}
function registrarCliente(){
    let userName = document.getElementById("userNameR").value;
    let fullName = document.getElementById("fullName").value;
    let dpi = document.getElementById("dpi").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("passR").value;
    let Email1 = document.getElementById("Email1").value;

    manager.Clientes.insertNode(dpi,fullName,userName,Email1,password,phone,false);
    swal("Registrar Usuario","Creado Correctamente","success");
}
//funciones de carga
function cargaPeliculas(x){
    let filePeliculas = x.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(filePeliculas);
    fileReader.onload = () => {
        let content = JSON.parse(fileReader.result);
        content.forEach(element => {
            manager.Peliculas.insertar(element.id_pelicula,element.nombre_pelicula,element.descripcion,element.puntuacion_star,element.precio_Q,element.paginas,element.categorias)
        });
        swal("Carga de Peliculas","Datos Cargados Correctamente","success");
    }
}
function cargaClientes(x){
    let fileClientes = x.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(fileClientes);
    fileReader.onload = () => {
        let content = JSON.parse(fileReader.result);
        content.forEach( element => {
            manager.Clientes.insertNode(element.dpi,element.nombre_completo,element.nombre_usuario,element.correo,element.contrasenia,element.telefono,false);
        })
        swal("Carga de Clientes","Datos Cargados Correctamente","success");
    }
}
function cargaActoresIconicos(x){
    let fileActores = x.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(fileActores);
    fileReader.onload = () => {
        let content = JSON.parse(fileReader.result);
        content.forEach( element => {
            manager.Actores.insert(element.dni,element.nombre_actor,element.correo,element.descripcion);
        })
        swal("Carga de Actores Iconicos","Datos Cargados Correctamente","success");
    }
}
function cargaCategorias(x){
    let fileCategorias = x.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(fileCategorias);
    fileReader.onload = () =>{
        let content = JSON.parse(fileReader.result);
        content.forEach( element => {
            manager.Categorias.insert({"id_categoria":element.id_categoria,"company":element.company});
        })
        swal("Carga de Categorias","Datos Cargados Correctamente","success");
    }
}
//graficas con graphviz

function graficarClientes(){
    document.getElementById("insertGraphAdmin").innerHTML="";
    d3.select("#insertGraphAdmin").graphviz()
    .zoom(false)
    .renderDot(manager.Clientes.graphList());
}
function graficarPeliculas(){
    document.getElementById("insertGraphAdmin").innerHTML="";
    d3.select("#insertGraphAdmin").graphviz()
    .zoom(false)
    .renderDot(manager.Peliculas.graficarArbolAVL());
}
function graficarActores(){
    document.getElementById("insertGraphAdmin").innerHTML="";
    d3.select("#insertGraphAdmin").graphviz()
    .zoom(false)
    .renderDot(manager.Actores.graphTree());
}
function graficarCategorias(){
    document.getElementById("insertGraphAdmin").innerHTML="";
    d3.select("#insertGraphAdmin").graphviz()
    .zoom(false)
    .renderDot(manager.Categorias.grapTablaHash());
}
//generando un nuevo bloque de blockchain
function newBloque(){
    manager.merkle.auth();
    manager.blockchain.crearBloque(manager.merkle.getDataBlock(),manager.merkle.rootNode.hash);
}
function generarIMG(){
    html2canvas($("#insertGraphAdmin")[0]).then(function (canvas) {
        $(".response").append(canvas);
        return Canvas2Image.saveAsPNG(canvas);
    });
}
//acciones para inputs tipo Files
document.getElementById("PeliculasInputFile").addEventListener("change",cargaPeliculas,false);
document.getElementById("clientesFileInput").addEventListener("change",cargaClientes,false);
document.getElementById("actoresFileInput").addEventListener("change",cargaActoresIconicos,false);
document.getElementById("categoriasFileInput").addEventListener("change",cargaCategorias,false);
document.getElementById("descargarEnImagen").addEventListener("click",generarIMG,false);

//funciones de llamadas
function irRegistro(){
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
}
function irLoginRegistro (){
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
}
function SalirAdmin(){
    document.getElementById("adminDashboard").style.display = "none";
    document.getElementById("login").style.display = "block";
}
function irBlockchain(){
    document.getElementById("adminDashboard").style.display = "none";
    document.getElementById("blockchain").style.display = "block"
}
function salirBlockchain(){
    document.getElementById("adminDashboard").style.display = "block";
    document.getElementById("blockchain").style.display = "none"
}

function generarBloque(){
    manager.merkle.auth()
    console.log(manager.merkle.getDataBlock())
    manager.blockchain.crearBloque(manager.merkle.getDataBlock(),manager.merkle.rootNode.hash);
    let divBloques = document.getElementById("global1");
    divBloques.innerHTML = ""
    divBloques.innerHTML = manager.blockchain.generarHTML()
    generarGrapMerkle()
    manager.merkle.cleanTree();
}
function generarGrapMerkle(){
    document.getElementById("insertarGrapMerkle").innerHTML="";
    d3.select("#insertarGrapMerkle").graphviz()
    .zoom(true)
    .renderDot(manager.merkle.grepTree());
}
//<script src="https://superal.github.io/canvas2image/canvas2image.js "></script>
//------------------------------------------------------------------------ Usuario Normal ------------------------------------------------------------------------
//funciones accionantes
function cargarViewPeliculasLR(){
    let tablaPeliculas = document.getElementById("tablaPeliculasBody");
    tablaPeliculas.innerHTML ="";
    tablaPeliculas.innerHTML = manager.Peliculas.HTMLOrdenLR();
}
function cargarViewPeliculasRL(){
    let tablaPeliculas = document.getElementById("tablaPeliculasBody");
    tablaPeliculas.innerHTML ="";
    tablaPeliculas.innerHTML = manager.Peliculas.HTMLOrdenRL();
}
function verPeliculaAVL(Id){
    let val = manager.Peliculas.buscarNodo(Id);
    manager.actualPelicula = val;
    let tituloV = val.nombre_pelicula;
    let desV = val.descripcion;
    let puntuacionV = val.puntuacion_star;
    let comentariosV = val.comentario

    let tituloModal = document.getElementById("tituloPeliculaIn");
    let desModal = document.getElementById("DescripciónPeliculaIn");
    let puntuacionModal = document.getElementById("PuntuaciónPeliculaIn");
    let commentariosModal = document.getElementById("comentariosIn");

    tituloModal.innerHTML= `${tituloV}`;
    desModal.innerHTML = desV;
    puntuacionModal.value = puntuacionV
    let cadena =""
    commentariosModal.innerHTML = ""
    for (let x = 0; x < comentariosV.length; x++) {
        cadena +=`
            <div>
                Usuario: ${comentariosV[x].usuario}, Mensaje: ${comentariosV[x].mensaje}
            <div>
        `  
    }
    commentariosModal.innerHTML += cadena;
}
function guardarModPelicula(){
    let tituloModal = document.getElementById("tituloPeliculaIn").innerHTML;
    let puntuacionModal = document.getElementById("PuntuaciónPeliculaIn");
    let res = manager.Peliculas.modificarNodo(tituloModal,puntuacionModal.value);
    swal("Modificacion","Datos Guardados Correctamente","success");
}
function guardarComentario(){
    let tituloModal = document.getElementById("tituloPeliculaIn").innerHTML;
    let nuevoMensaje = document.getElementById("ingresoComentarioIn").value;
    console.log(manager.actualUsuario)
    manager.Peliculas.agregarMensaje(tituloModal,{"usuario":manager.actualUsuario.nombre_usuario,"mensaje":nuevoMensaje});
    swal("Agregar Comentario","Datos Guardados Correctamente","success");
}
function alquilarPeliculaAVL(Id){
    let val = manager.Peliculas.buscarNodo(Id);
    manager.merkle.insert(Id,val.nombre_pelicula);
    swal("Alquiler","Datos Guardados Correctamente","success");
}

//funciones para Actores

function cargarActoresView(){
    let divActoresTable = document.getElementById("tablaActoresH");
    divActoresTable.innerHTML = manager.Actores.HTMLPreorden();
}
function cargaActoresInOrden(){
    let divActoresTable = document.getElementById("tablaActoresH");
    divActoresTable.innerHTML = ""
    divActoresTable.innerHTML = manager.Actores.HTMLInOrden();
}
function cargaActoresPostOrden(){
    let divActoresTable = document.getElementById("tablaActoresH");
    divActoresTable.innerHTML = ""
    divActoresTable.innerHTML = manager.Actores.HTMLPostOrden();
}

//funciones tabla Hash
function cargaHash(){
    let divHash = document.getElementById("tablaHashInsert");
    divHash.innerHTML = "";
    divHash.innerHTML = manager.Categorias.generarHashHTML();
}
// funcion para alquilar pelicula
function alquilarPelicula(){
    if(manager.actualPelicula != null ){
        manager.merkle.insert(manager.actualUsuario.nombre_usuario,manager.actualPelicula.nombre_pelicula);
        swal("Alquiler","Datos Guardados Correctamente","success");
    }
}
function irPeliculas(){
    document.getElementById("dashboardPeliculas").style.display="block";
    document.getElementById("ActoresIn").style.display="none";
    document.getElementById("CategoriasIn").style.display="none";
    cargarViewPeliculasLR();
}
function irActores(){
    document.getElementById("dashboardPeliculas").style.display="none";
    document.getElementById("ActoresIn").style.display="block";
    document.getElementById("CategoriasIn").style.display="none";
    cargarActoresView();
}
function irHash(){
    document.getElementById("dashboardPeliculas").style.display="none";
    document.getElementById("ActoresIn").style.display="none";
    document.getElementById("CategoriasIn").style.display="block";
    cargaHash()
}
function salirNormal(){
    document.getElementById("normalDashboard").style.display = "none"
    document.getElementById("login").style.display = "block"
}