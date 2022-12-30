class DataNode{
    constructor(id,nombre_cliente,nombre_pelicula){
        this.id = id
        this.nombre_cliente = nombre_cliente
        this.nombre_pelicula = nombre_pelicula
    }
}

class HashNode{
    constructor(id,hash){
        this.id = id
        this.hash = hash
        this.izquierda = null
        this.derecha = null
    }
}

class MerkleTree{
    constructor(){
        this.rootNode = null
        this.datablock = []
        this.index = 0
        this.idOrder = 0
        this.cantUnos = 0
    }
    //agregamos valores a datablock
    insert(nombre_cliente,nombre_pelicula){
        this.idOrder++
        this.datablock.push(new DataNode(this.idOrder,nombre_cliente,nombre_pelicula));
    }
    calcularExponente(){
        let exp = 1
        if (this.datablock.length % 2 != 0) {
            while(Math.pow(2,exp) < this.datablock.length){
                exp++;
            }
            this.cantUnos = Math.pow(2,exp) - this.datablock.length;
            return exp
        } else if(this.datablock.length % 2 == 0){
            while (Math.pow(2,exp) < this.datablock.length) {
                exp++
            }
            this.cantUnos = Math.pow(2,exp) - this.datablock.length;
        }
        return exp
    }
    crearArbol(exp){
        this.idOrder++
        this.rootNode = new HashNode(this.idOrder,0);
        this._crearArbol(this.rootNode,exp)
    }
    _crearArbol(Nodo,exp){
        if (exp > 0) {
            this.idOrder++
            Nodo.izquierda = new HashNode(this.idOrder,0);
            this.idOrder++
            Nodo.derecha = new HashNode(this.idOrder,0);

            this._crearArbol(Nodo.izquierda, exp-1);
            this._crearArbol(Nodo.derecha, exp-1);
        }
    }
    genHash(Nodo,n){
        if (Nodo != null) {
            this.genHash(Nodo.izquierda,n);
            this.genHash(Nodo.derecha,n);
            if (Nodo.izquierda == null && Nodo.derecha == null) {
                Nodo.izquierda = this.datablock[n-this.index--];
                Nodo.hash = sha256(Nodo.izquierda.nombre_cliente+""+Nodo.izquierda.nombre_pelicula);
            }else{
                Nodo.hash = sha256(Nodo.izquierda.hash + "" + Nodo.derecha.hash);
            }
        }
    }
    auth(){
        let exp = this.calcularExponente();
        console.log(exp)
        for (let x = this.datablock.length; x < Math.pow(2,exp); x++) {
            this.datablock.push(1)            
        }
        this.index = Math.pow(2,exp)
        this.crearArbol(exp)
        this.genHash(this.rootNode,Math.pow(2,exp));
    }

    grepTree(){
        let cadena = "digraph G { \n rankdir=TB;\n node [shape = record, style=filled];\n";
        cadena += `NodoH${this.rootNode.id}[label="${this.rootNode.hash}"];`
        cadena += this.exploreNode(this.rootNode);
        cadena += "}"
        this.calcularExponente;
        return cadena
    }
    exploreNode(Nodo){
        if(Nodo == null) return ""
        let cadena = ""
        if (Nodo.izquierda != null) {
            if (Nodo.izquierda instanceof DataNode) {
                cadena += `Nodo_${Nodo.izquierda.id}[label= "Pelicula: ${Nodo.izquierda.nombre_pelicula},\\n Cliente: ${Nodo.izquierda.nombre_cliente}"];\n`;
                cadena += `NodoH${Nodo.id} -> Nodo_${Nodo.izquierda.id};\n`
            }
        }
        if (Nodo.izquierda instanceof HashNode) {
            if (Nodo.izquierda != null) cadena += `NodoH${Nodo.izquierda.id}[label="${Nodo.izquierda.hash}"];\n NodoH${Nodo.id} -> NodoH${Nodo.izquierda.id};\n`
            if (Nodo.derecha != null) cadena += `NodoH${Nodo.derecha.id}[label="${Nodo.derecha.hash}"];\n NodoH${Nodo.id} -> NodoH${Nodo.derecha.id};\n`
        }
        if (Nodo.izquierda == 1) {
            cadena += `NodoI1${this.cantUnos}[label="1"];\n NodoH${Nodo.id} -> NodoI1${this.cantUnos}\n`
            this.cantUnos--
        }
        cadena += this.exploreNode(Nodo.izquierda);
        cadena +=  this.exploreNode(Nodo.derecha);
        return cadena
    }
    getDataBlock(){
        let tmp = []
        for (let x = 0; x < this.datablock.length; x++) {
            if (this.datablock[x] != 1){
                tmp.push(this.datablock[x]);
            }
        }
        return tmp;
    }
    cleanTree(){
        this.rootNode = null
        this.datablock = []
        this.index = 0
        this.idOrder = 0
        this.cantUnos = 0
    }
}
