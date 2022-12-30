class NodoAVL{
    constructor(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,paginas,categorias){
        this.id_pelicula = id_pelicula
        this.nombre_pelicula = nombre_pelicula
        this.descripcion = descripcion
        this.puntuacion_star = puntuacion_star
        this.precio_Q = precio_Q
        this.paginas = paginas
        this.categorias = categorias
        this.comentario = []

        // estructura para arbol
        this.izquierda = null
        this.derecha = null
        this.altura = 0
    }
}

class AVL{
    constructor(){
        this.root = null
    }
    MAYOR(valor1,valor2){
        if (valor1>valor2) return valor1
        return valor2
    }
    altura(nodo){
        if(nodo == null) return -1;
        return nodo.altura;
    }
    insertar(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,paginas,categorias){
        this.root = this.add(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,paginas,categorias,this.root);
    }
    add(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,paginas,categorias,Nodo){
        if (Nodo == null) return new NodoAVL(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,paginas,categorias)
        else{
            if (nombre_pelicula < Nodo.nombre_pelicula) {

                Nodo.izquierda = this.add(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,paginas,categorias,Nodo.izquierda)

                if (this.altura(Nodo.derecha)-this.altura(Nodo.izquierda) == -2) {
                    if (nombre_pelicula < Nodo.izquierda.nombre_pelicula) {
                        Nodo = this.rotacionIzquierda(Nodo);
                    }else{
                        Nodo = this.rotacionDobleIzquierda(Nodo);
                    }
                }
            }else if (nombre_pelicula > Nodo.nombre_pelicula) {
                Nodo.derecha = this.add(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,paginas,categorias,Nodo.derecha);
                if (this.altura(Nodo.derecha)-this.altura(Nodo.izquierda) == 2) {
                    if (nombre_pelicula > Nodo.derecha.nombre_pelicula) {
                        Nodo = this.rotacionDerecha(Nodo)
                    }else{
                        Nodo = this.rotacionDobleDerecha(Nodo);
                    }
                }
            }else if(nombre_pelicula == Nodo.nombre_pelicula){
                console.log("repetido")
            }else{
                Nodo.nombre_pelicula = nombre_pelicula
            }
        }
        Nodo.altura = this.MAYOR(this.altura(Nodo.izquierda),this.altura(Nodo.derecha))+1
        return Nodo
    }
    rotacionIzquierda(Nodo){
        let aux = Nodo.izquierda
        Nodo.izquierda = aux.derecha
        aux.derecha = Nodo

        Nodo.altura = this.MAYOR(this.altura(Nodo.derecha),this.altura(Nodo.izquierda)+1);
        aux.altura = this.MAYOR(this.altura(Nodo.izquierda),Nodo.altura)+1;
        return aux;
    }
    rotacionDerecha(Nodo){
        let aux = Nodo.derecha
        Nodo.derecha = aux.izquierda
        aux.izquierda = Nodo;

        Nodo.altura = this.MAYOR(this.altura(Nodo.derecha),this.altura(Nodo.izquierda)+1);
        aux.altura = this.MAYOR(this.altura(Nodo.derecha),Nodo.altura+1);
        return aux;
    }
    rotacionDobleDerecha(Nodo){
        Nodo.derecha = this.rotacionIzquierda(Nodo.derecha)
        return this.rotacionDerecha(Nodo)
    }
    rotacionDobleIzquierda(Nodo){
        Nodo.izquierda = this.rotacionDerecha(Nodo.izquierda)
        return this.rotacionIzquierda(Nodo);
    }
    graficarArbolAVL(){
        let cadena = "digraph G { \n rankdir=TB;\n node [shape = record, style=filled];\n"
        cadena += this.graficarNodos(this.root,0)
        cadena+= "}";
        return cadena
    }
    HTMLOrdenLR(){
        return this.grafEnOrdenLR(this.root)
    }
    HTMLOrdenRL(){
        return this.grafEnOrdenRL(this.root)
    }
    grafEnOrdenLR(Nodo){
        if(Nodo == null) return "";
        let cadena = ""

        cadena += this.grafEnOrdenLR(Nodo.izquierda);
        cadena += `
        <tr>
            <td>${Nodo.nombre_pelicula}</td>
            <td>${Nodo.descripcion}</td>
            <td><button class="btn btn-info me-1" onclick="verPeliculaAVL('${Nodo.nombre_pelicula}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Info</button><button class="btn btn-primary me-1" onclick="alquilarPeliculaAVL('${Nodo.nombre_pelicula}')">Alquilar</button></td>
            <td>Q ${Nodo.precio_Q}</td>
        </tr>
        `
        cadena += this.grafEnOrdenLR(Nodo.derecha);
        return cadena
    }
    grafEnOrdenRL(Nodo){
        if(Nodo == null) return "";
        let cadena = ""

        cadena += this.grafEnOrdenRL(Nodo.derecha);
        cadena += `
        <tr>
            <td>${Nodo.nombre_pelicula}</td>
            <td>${Nodo.descripcion}</td>
            <td><button class="btn btn-info me-1" onclick="verPeliculaAVL('${Nodo.nombre_pelicula}')" data-bs-toggle="modal" data-bs-target="#exampleModal" >Info</button><button class="btn btn-primary me-1" onclick="alquilarPeliculaAVL('${Nodo.nombre_pelicula}')">Alquilar</button></td>
            <td>Q ${Nodo.precio_Q}</td>
        </tr>
        `
        cadena += this.grafEnOrdenRL(Nodo.izquierda);
        return cadena
    }
    buscarNodo(id){
        return this.busquedaID(this.root,id)
    }
    busquedaID(Nodo,id){
        if (Nodo == null) return null

        if (Nodo.nombre_pelicula == id) {
            return Nodo;
        }else{
            if (id < Nodo.nombre_pelicula) {
                return this.busquedaID(Nodo.izquierda,id);
            }else if (id > Nodo.nombre_pelicula) {
                return this.busquedaID(Nodo.derecha,id);
            }
        }
        return null;
    }
    modificarNodo(id,puntuacion){
        return this.modificarId(this.root,id,puntuacion)
    }
    modificarId(Nodo,id,puntuacion){
        if (Nodo == null) return ""

        if (Nodo.nombre_pelicula == id) {
            Nodo.puntuacion_star = puntuacion;
            return "Succes";
        }else{
            if (id < Nodo.nombre_pelicula) {
                return this.modificarId(Nodo.izquierda,id,puntuacion);
            }else if (id > Nodo.nombre_pelicula) {
                return this.modificarId(Nodo.derecha,id,puntuacion);
            }
        }
        return "Error";
    }
    agregarMensaje(id,mensaje){
        return this.buscandoMensaje(this.root,id,mensaje)
    }
    buscandoMensaje(Nodo,id,mensaje){
        if (Nodo == null) return ""

        if (Nodo.nombre_pelicula == id) {
            Nodo.comentario.push(mensaje);
            return "Succes";
        }else{
            if (id < Nodo.nombre_pelicula) {
                return this.buscandoMensaje(Nodo.izquierda,id,mensaje);
            }else if (id > Nodo.nombre_pelicula) {
                return this.buscandoMensaje(Nodo.derecha,id,mensaje);
            }
        }
        return "Error";
    }

    graficarNodos(Nodo,number){
        if(Nodo == null) return ""
        number++
        let cadena = ""
        cadena += this.graficarNodos(Nodo.izquierda,number);
        cadena += this.graficarNodos(Nodo.derecha,number);

        let izquierda = ""
        let derecha = ""
        if(Nodo.izquierda != null){
            izquierda = "<C0>|";
        }
        if (Nodo.derecha != null) {
            derecha = "|<C1>"
        }
        cadena += `Nodo_${Nodo.id_pelicula}[label = "${izquierda} Id: ${Nodo.id_pelicula}, Pelicula: ${Nodo.nombre_pelicula} ${derecha}"];\n`

        if (Nodo.izquierda != null) {
            cadena += `Nodo_${Nodo.id_pelicula}:C0 -> Nodo_${Nodo.izquierda.id_pelicula};\n`          
        }
        if (Nodo.derecha != null) {
            cadena += `Nodo_${Nodo.id_pelicula}:C1 -> Nodo_${Nodo.derecha.id_pelicula};\n`
        }
        return cadena
    }
}