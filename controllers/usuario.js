import Usuario from '../models/usuario.js';
import { generarJWT } from '../middlewares/validar-jwt.js';
import bcryptjs from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'

const usuario = {
    resetearPassword:async(req,res)=>{
        const {id}=req.params
        try {
            const generarPassword = () => {
                let numeros = "0123456789";
                let letras = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
                let simbolos = ".?,;-_¡!¿*%&$/()[]{}|@><"
                let todo = numeros + letras + simbolos;
                let pass = "";

                for (let i = 0; i < 12; i++) {
                    let indiceAleatorio = Math.floor(Math.random() * todo.length);
                    pass += todo.charAt(indiceAleatorio);
                }
                return pass
            }

            let aleatorio = generarPassword()

            const salt = bcryptjs.genSaltSync(10)
            const password = bcryptjs.hashSync(aleatorio, salt)
            const usuario = await Usuario.findByIdAndUpdate(id, {password });

            res.json({
                usuario, aleatorio 
            })
            
            
        } catch (error) {
            return res.status(500).json({ msg: "La contraseña no pudo ser ingresado hable con el web master carlitos" })

        }

    },
    usuarioPost: async (req, res) => {
        try {
            const { nombre, documento, email, area, rol } = req.body

            const generarPassword = () => {
                let numeros = "0123456789";
                let letras = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
                let simbolos = ".?,;-_¡!¿*%&$/()[]{}|@><"
                let todo = numeros + letras + simbolos;
                let pass = "";

                for (let i = 0; i < 12; i++) {
                    let indiceAleatorio = Math.floor(Math.random() * todo.length);
                    pass += todo.charAt(indiceAleatorio);
                }
                return pass
            }

            let password = generarPassword()
            const usuario = new Usuario({ nombre, documento, email, password, area, rol })
            const salt = bcryptjs.genSaltSync(10)
            usuario.password = bcryptjs.hashSync(password, salt)
            usuario.save()

            res.json({ usuario, password });

        } catch (error) {
            return res.status(500).json({ msg: "el usuario no pudo ser ingresado hable con carlitos" })
        }
    },
    usuarioGet: async (req, res) => {
        try {
            const usuario = await Usuario.find()
            res.json({
                usuario
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioGetId: async (req, res) => {
        try {
            const { id } = req.params
            const usuario = await Usuario.findById(id)

            res.json({
                usuario
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioGetIdent: async (req, res) => {
        try {
            const { documento } = req.params
            const usuario = await Usuario.find({ documento })
                .populate("documento", ["nombre"])
            console.log(documento)
            res.json({
                usuario
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    cargarArchivoCloud: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true
        });

        const { id } = req.params;
        try {
            //subir archivo
            const { tempFilePath } = req.files.archivo;
            
            cloudinary.uploader.upload(tempFilePath,{
                folder:"Coohilados",
                gravity:"auto",
                width:"400", 
                height:"400",
                crop:"thumb"
            },
                async function (error, result) {
                    if (result) {
                        let usuario = await Usuario.findById(id);
                        if (usuario.foto && usuario.borrarFoto) {
                            /* const nombreTemp = usuario.foto.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.') */
                            await cloudinary.uploader.destroy(usuario.borrarFoto)
                        }
                        usuario = await Usuario.findByIdAndUpdate(id, { foto: result.url, borrarFoto: result.public_id })
                        //responder
                        res.json({ url: result.url });
                        console.log(result);

                    } else {
                        res.json(error)
                    }
                })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioPut: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, createAdt, estado, ...resto } = req.body;

            const usuario = await Usuario.findByIdAndUpdate(id, resto);

            res.json({
                usuario
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    cambiarPassword: async (req, res) => {
        try {
            const { id } = req.params
            const { passwordActual, nuevaPassword } = req.body;

            const usuario = await Usuario.findById({ _id: id })

            if (!usuario) {
                return res.status(404).json({ msg: "No se encontro el usuario" })
            }

            const validPassword = bcryptjs.compareSync(passwordActual, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Password actual no coincide"
                })
            }

            const salt = bcryptjs.genSaltSync(10)
            const password = bcryptjs.hashSync(nuevaPassword, salt)

            const modificar = await Usuario.findByIdAndUpdate(id, { password })
            if (!modificar) {
                return res.status(400).json({ msg: "No se pudo actualizar la contraseña" })
            }

            res.json({ modificar })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioPutActiv: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 });

            res.json({
                usuario
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioPutDesactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndUpdate(id, { estado: 2 });

            res.json({
                usuario
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioPutVacaciones: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndUpdate(id, { estado: 3 });

            res.json({
                usuario
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioGetlogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            const usuario = await Usuario.findOne({ email })
            if (!usuario) {
                return res.status(400).json({ msg: "Usuario no es correctos" });
            }
            if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            }
            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Password no son correctos"
                })
            }

            const token = await generarJWT(usuario.id);

            res.json({
                usuario,
                token

            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioPutEliminar: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndDelete(id);
            res.json({
                usuario
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    }
}



export { usuario }