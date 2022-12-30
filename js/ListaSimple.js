class NodoSimple{
    constructor(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono,admin){
        this.dpi = dpi
        this.nombre_completo = nombre_completo
        this.nombre_usuario = nombre_usuario
        this.correo = correo
        this.contrasenia = contrasenia
        this.telefono = telefono
        this.admin = admin

        this.nextNode = null
        this.previusNode = null
    }
}

class ListaSimple{
    constructor(){
        this.rootNode = null
        this.endNode = null
        this.size = 0
    }

    insertNode(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono,admin){
        let passEncript = sha256(contrasenia)
        let newNode = new NodoSimple(dpi,nombre_completo,nombre_usuario,correo,passEncript,telefono,admin)
        this.size++
        if (this.rootNode == null) {
            this.rootNode = newNode;
            this.endNode = newNode
        }else{
            this.endNode.nextNode = newNode
            newNode.previusNode = this.endNode
            this.endNode = newNode
        }
    }
    validarUsuario(userName,password){
        let tmp = this.rootNode;
        for (let x = 0; x < this.size; x++) {
            if (tmp.nombre_usuario == userName) {
                let passEncript = sha256(password)
                if (tmp.contrasenia == passEncript) {
                    return "success"
                }
                return "Contraseña Incorrecta"
            }
            tmp = tmp.nextNode
        }
        return "Usuario Inexistente"
    }
    esAdmin(userName){
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            if (tmp.nombre_usuario == userName) {
                return  tmp.admin
            }
            tmp = tmp.nextNode
        }
        return false
    }
    getUsuario(userName){
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            if (tmp.nombre_usuario == userName) {
                return tmp
            }
            tmp = tmp.nextNode
        }
        return null
    }
    graphList(){
        let tmp = this.rootNode
        let cadena = ""
        cadena+="digraph G {\n"
        cadena+="rankdir = LR;\n"
        cadena+="nodoRaiz[label = \"Head\"];\n"
        for (let x = 0; x < this.size; x++) {
            cadena += `us${x}[label = \"Usuario: ${tmp.nombre_usuario}, Dpi: ${tmp.dpi}\\n ", shape=\"box\"];\n`;
            tmp = tmp.nextNode
        }
        tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            if (x == 0) {
                cadena+=`nodoRaiz -> us${x};\n`; 
            }
            if (x == this.size-1) {
                break
            }else{
                cadena+=`us${x} -> us${x+1};\n`;
            }
        }
        cadena+="}"
        console.log(cadena)
        return cadena
    }
}