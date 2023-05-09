import express from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import { dbConnection } from "../database/config.js"
import infoDepartamento from "../routes/ciudad.js"
import infoCiudad from "../routes/ciudad.js"
import usuario from "../routes/usuario.js"
import setup from "../routes/setup.js"
import servicio from "../routes/servicio.js"
import areaTrabajo from "../routes/areaTrabajo.js"
import directo from "../routes/trabajadorDirecto.js"
import ayudaTemporal from "../routes/ayudaTemporal.js"
import pension from "../routes/pension.js"
import aportante from "../routes/aportante.js"


class Server {
    constructor() {
        this.app = express()
        this.middlewares()
        this.port = process.env.PORT
        this.conectarBd()
        this.routes()
    }
    routes() {
        this.app.use('/api/usuario', usuario)
        this.app.use('/api/servicio', servicio)
        this.app.use('/api/aportante', aportante)
        this.app.use('/api/ayudaTemporal', ayudaTemporal)
        this.app.use('/api/areaTrabajo', areaTrabajo)
        this.app.use('/api/trabajadorDirecto', directo)
        this.app.use('/api/departamento', infoDepartamento)
        this.app.use('/api/ciudad', infoCiudad)
        this.app.use('/api/setup', setup)
        this.app.use('/api/pension',pension)
    }

    async conectarBd() {
        await dbConnection()
    }


    middlewares() {
        this.app.use(express.json())
        
        this.app.use(cors())
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }



    escuchar() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }
}
export { Server }  