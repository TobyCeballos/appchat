const { promises: fs} = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }

    async saveMsj(msg){
        try {
            const objs = await this.getMessage();
            console.log(objs)
            const newObj = {...msg}
            objs.push(newObj)

            fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            console.log(`Mensaje: ${JSON.stringify(newObj)} almacenado correctamente`);
            
        } catch (error) {
            console.log('Error al almacenar', error);
        }
    };

    async getMessage(){
        try {
            const objs = await fs.readFile(this.archivo, 'utf-8');
            return JSON.parse(objs);
        } catch (error) {
            return error;
        }
    }
};


const message = new Contenedor("./mensajes.txt")
module.exports = message;
