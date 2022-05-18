const { promises: fs} = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }

    async saveProd(obj){
        try {
            const objs = await this.getProds();
            //console.log(objs)
            let newId = 1;
            if(objs.length > 0){
                newId = objs[objs.length - 1].id + 1;
            }
            const newObj = {...obj, id: newId}
            objs.push(newObj)

            fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            console.log(`Creado exitosamente el producto ${newId}`);
            
        } catch (error) {
            console.log('Error al crear', error);
        }
    };

    async getProds(){
        try {
            const objs = await fs.readFile(this.archivo, 'utf-8');
            return JSON.parse(objs);
        } catch (error) {
            return error;
        }
    }
};



const archivo1 = new Contenedor("./productos.txt")
module.exports = archivo1;
