import Usuario from '../models/usuario.js';
import { generarJWT } from '../middlewares/validar-jwt.js';
import bcryptjs from 'bcryptjs'
import helpersBitacora from '../helpers/bitacora.js';

const usuario = {
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
    usuarioPut: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, createAdt, estado, ...resto } = req.body;

            const salt = bcryptjs.genSaltSync(10)
            resto.password = bcryptjs.hashSync(resto.password, salt)

            const usuario = await Usuario.findByIdAndUpdate(id, resto);

            res.json({
                usuario
            })
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