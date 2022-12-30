class NodoABB{
    constructor(id,dni,nombre_actor,correo,descripcion){
        this.id = id
        this.dni = dni
        this.nombre_actor = nombre_actor 
        this.correo = correo
        this.descripcion = descripcion
        
        this.left = null
        this.rigth = null
    }
}

class ABB{
    constructor(){
        this.root = null
        this.id = 0
    }
    insert(dni,nombre_actor,correo,descripcion){
        this.id++
        this.root = this.addActor(this.root,dni,nombre_actor,correo,descripcion);
    }
    addActor(Nodo,dni,nombre_actor,correo,descripcion){
        if (Nodo == null) return new NodoABB(this.id,dni,nombre_actor,correo,descripcion);

        if (nombre_actor > Nodo.nombre_actor) {
            Nodo.rigth = this.addActor(Nodo.rigth,dni,nombre_actor,correo,descripcion);
        } else if (nombre_actor < Nodo.nombre_actor) {
            Nodo.left = this.addActor(Nodo.left,dni,nombre_actor,correo,descripcion);
        }
        return Nodo
    }
    graphTree(){
        let cadena = "digraph G { \n rankdir=TB;\n node [shape = record, style=filled];\n"
        cadena+= this.exploreGraph(this.root,0);
        cadena+= "}"
        return cadena
    }
    HTMLPreorden(){
        return this.preordenHTML(this.root)
    }
    preordenHTML(Nodo){
        if(Nodo == null) return ""
        let cadena = ""
        cadena += `
        <tr>
            <td>${Nodo.nombre_actor}</td>
            <td>${Nodo.descripcion}</td>
        </tr>
        `
        cadena += this.preordenHTML(Nodo.left);
        cadena += this.preordenHTML(Nodo.rigth)

        return cadena;
    }
    HTMLInOrden(){
        return this.inOrdenHTML(this.root)
    }
    inOrdenHTML(Nodo){
        if(Nodo == null) return ""
        let cadena = ""
        cadena += this.preordenHTML(Nodo.left);
        cadena += `
        <tr>
            <td>${Nodo.nombre_actor}</td>
            <td>${Nodo.descripcion}</td>
        </tr>
        `
        cadena += this.preordenHTML(Nodo.rigth)
        return cadena;
    }
    HTMLPostOrden(){
        return this.postOrdenHTML(this.root)
    }
    postOrdenHTML(Nodo){
        if(Nodo == null) return ""
        let cadena = ""
        cadena += this.preordenHTML(Nodo.left);
        cadena += this.preordenHTML(Nodo.rigth);
        cadena += `
        <tr>
            <td>${Nodo.nombre_actor}</td>
            <td>${Nodo.descripcion}</td>
        </tr>
        `
        return cadena;
    }
    exploreGraph(Nodo,number){
        if (Nodo == null) return "";
        number++
        let cadena = ""
        cadena += this.exploreGraph(Nodo.left,number);
        cadena += this.exploreGraph(Nodo.rigth,number);

        let izquieda = ""
        let derecha = ""
        if(Nodo.left != null){
            izquieda = "<C0>|";
        }
        if (Nodo.rigth != null) {
            derecha = "|<C1>"
        }
        cadena += `Nodo_${Nodo.id}[label = "${izquieda} Nombre Actor: ${Nodo.nombre_actor} ${derecha}"];\n`

        if (Nodo.left != null) {
            cadena += `Nodo_${Nodo.id}:C0 -> Nodo_${Nodo.left.id};\n`          
        }
        if (Nodo.rigth != null) {
            cadena += `Nodo_${Nodo.id}:C1 -> Nodo_${Nodo.rigth.id};\n`
        }
        return cadena;
    }
}