class Nodo{
    constructor(valor){
        this.valor = valor
        this.nextNode = null 
    }
}

class lista{
    constructor(){
        this.head = null
        this.size = 0
    }
    insertar(valor){
        this.size++
        let tmp = new Nodo(valor)
        tmp.nextNode = this.head
        this.head = tmp
    }
    getSize(){
        return this.size
    }
    vacia(){
        return this.head === null;
    }
    generarHTML(){
        let tmp = this.head;
        let cadena = ""
        for (let x = 0; x < this.size; x++) {
            cadena += `
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title text-center h4 border-bottom">Categoría</h5>
                        <p class="card-text mt-1">Id Categoria: ${tmp.valor.id_categoria}</p>
                        <p class="card-text">Company: ${tmp.valor.company}</p>
                    </div>
                </div>
            </div>
            `
            tmp = tmp.nextNode
        }
        return cadena
    }
    grapList(i){
        let cadena = ""
        let tmp = this.head
        for (let x = 0; x < this.size; x++) {
           cadena += `nodoLista${i}_${x}[label = "Nodo: ${tmp.valor.id_categoria}"];\n`
           tmp = tmp.nextNode
        }
        for (let x = 0; x < this.size; x++) {
            if (x != this.size-1) {
                cadena += `nodoLista${i}_${x} -> nodoLista${i}_${x+1};\n`
            }
        }
        return cadena
    }
}

class TablaHash{
    constructor(size){
        this.monto = 0
        this.size = size
        this.tabla = []
        for (let x = 0; x < this.size; x++) {
            this.tabla.push(new lista())
        }
    }

    funcionHash(valor){
        return valor % this.size
    }

    insert(valor){
        let indice = this.funcionHash(valor.id_categoria)
        if(this.tabla[indice].vacia()){
            this.monto++;
        }
        this.tabla[indice].insertar(valor);
        this.rehashing();
    }
    rehashing(){
        let porcentaje = this.monto/this.size
        if (porcentaje > 0.75) {
            let tmp = this.tabla;
            let tmpSize = this.size
            this.size = this.monto*5
            this.tabla = []
            for (let x = 0; x < this.size; x++) {
                this.tabla.push(new lista())                
            }
            for (let x = 0; x < tmpSize; x++) {
                if (!tmp[x].vacia()) {
                    let nodo = tmp[x].head;
                    while(nodo != null){
                        this.insert(nodo.valor)
                        nodo = nodo.nextNode
                    }
                }
            }
        }
    }
    grapTablaHash(){
        let cadena = ""
        cadena += "digraph structs\n{\nrankdir=\"LR\"\nnode [shape=box];\n";
        for (let x = 0; x < this.tabla.length; x++) {
            cadena += `NodoHead${x}[label="Head ${x}"];\n`
        }
        for (let x = 0; x < this.tabla.length; x++) {
            if (x != this.tabla.length-1) {
                cadena += `NodoHead${x} -> NodoHead${x+1};\n`
            }
        }
        cadena += "{rank=same;";
        for (let x = 0; x < this.tabla.length; x++) {
            cadena += `NodoHead${x};`
        }
        cadena += "}\n";
        
        for (let x = 0; x < this.tabla.length; x++) {
            if (!this.tabla[x].vacia()) {
                cadena += this.tabla[x].grapList(x)
                cadena += `NodoHead${x} -> nodoLista${x}_0;\n`
            }
        }
        cadena+="}"
        return cadena;
    }
    generarHashHTML(){
        let cadena = ""
        for (let x = 0; x < this.size; x++) {
            cadena += this.tabla[x].generarHTML();            
        }
        return cadena
    }
}