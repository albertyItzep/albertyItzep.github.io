class Bloque{
    constructor(index,previusHash, hash,data,date, nonce,rootMerkle){
        this.index = index;
        this.previusHash = previusHash;
        this.date = date
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.rootMerkle = rootMerkle;
    }
}

class NodoBlock{
    constructor(valor){
        this.valor = valor
        this.nextNode = null
        this.previusNode = null
    }
}

class BlockChain{
    constructor(){
        this.rootNode = null
        this.endNode = null
        this.size = 0
    }
    crearBloque(dataBlockI,rootMerkleI){
        let date = new Date(Date.now());
        date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-::${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let dataBlock = dataBlockI;
        let rootMerkle = rootMerkleI;

        let previusHash = ""
        if (this.rootNode == null) {
            previusHash = "00"
        }else{
            previusHash = this.endNode.valor.hash;
        }

        let nonce = 0
        let hash = ""

        while (!hash.startsWith("00")) {
            hash = sha256(this.size+date+previusHash+rootMerkle+nonce);
            nonce++
        }
        let newNodo = new Bloque(this.size,previusHash,hash,dataBlock,date,nonce,rootMerkle);
        this.insert(newNodo)
    }
    insert(valor){
        let newNodo = new NodoBlock(valor);
        this.size++
        if (this.rootNode == null) {
            this.rootNode = newNodo
            this.endNode = newNodo
        }else{
            this.endNode.nextNode = newNodo;
            newNodo.previusNode = newNodo;
            this.endNode = newNodo
        }
    }
    generarHTML(){
        let tmp = this.rootNode
        let cadena = ""
        for (let x = 0;x < this.size; x++) {
            let info =""
            for (let i = 0; i < tmp.valor.data.length; i++) {
                info += `Usuario: ${tmp.valor.data[i].nombre_cliente}, Pelicula: ${tmp.valor.data[i].nombre_pelicula}.\n`
            }
            console.log(info)
            cadena +=`
            <div class="card" style="width: 30rem;" id="mensajes1">
                <div class="card-body">
                    <h3 class="card-title text-center">Bloque ${tmp.valor.index}</h3>
                    <div class="mt-1">Hash: <input type="text" name="" value="${tmp.valor.hash}" id="Hash" readonly></div>
                    <div class="mt-1">Previus Hash: <input type="text" name="" value="${tmp.valor.previusHash}" id=""></div>
                    <div class="mt-1">Root Merkle: <input type="text" name="" value="${tmp.valor.rootMerkle}" id=""></div>
                    <div>Transacciones:</div>
                    <div class="mt-1"><textarea name="" id="" cols="30" rows="4" readonly>${info}</textarea></div>
                    <p>Fecha: ${tmp.valor.date}</p>
                    <p>Nonce: ${tmp.valor.nonce}</p>
                </div>
            </div>  
            `
            tmp = tmp.nextNode
        }
        return cadena
    }

}