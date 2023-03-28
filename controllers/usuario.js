import Usuario from '../models/usuario.js';
import { generarJWT } from '../middlewares/validar-jwt.js';
import bcryptjs from 'bcryptjs'
import helpersBitacora from '../helpers/bitacora.js';

const usuario = {


    usuarioPost: async (req, res) => {

        try {
            const { nombre,
                documento,
                email,
                password,
                area,
                rol,
                estado } = req.body
            const usuario = new Usuario({
                nombre,
                documento,
                email,
                password,
                area,
                rol,
                estado
            })
            const salt = bcryptjs.genSaltSync(10)
            usuario.password = bcryptjs.hashSync(password, salt)
            usuario.save()

            res.json({ usuario });



        } catch (error) {
            return res.status(500).json({ msg: "el usuario no pudo ser ingresado hable con carlitos" })

        }

    },
    usuarioGet: async (req, res) => {
        const usuario = await Usuario.find()
        res.json({
            usuario
        })
    },
    usuarioGetId: async (req, res) => {
        const { id } = req.params
        const usuario = await Usuario.findById(id)

        res.json({
            usuario
        })
    },
    usuarioGetIdent: async (req, res) => {

        const { documento } = req.params
        const usuario = await Usuario.find({ documento })
            .populate("documento", ["nombre"])
        console.log(documento)
        res.json({
            usuario
        })
        console.log(usuario)
    },
    usuarioPut: async (req, res) => {
        const { id } = req.params;
        const { _id, createAdt, estado, ...resto } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        res.json({
            usuario
        })
    },
    usuarioPutActiv: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 });

        res.json({
            usuario
        })
    },
    usuarioPutDesactivar: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 2 });

        res.json({
            usuario
        })
    },
    usuarioPutVacaciones: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 3 });

        res.json({
            usuario
        })
    },
    usuarioGetlogin: async (req, res) => {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({ msg: "Usuario / Password no son correctos" });
        }
        if (usuario.estado === 0) {
            return res.status(400).json({
                msg: "Usuario Inactivo"
            })
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        const token = await generarJWT(usuario.id);
        console.log("token: " + token)

        res.json({
            usuario,
            token

        })

    },

    usuarioPutEliminar: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        res.json({
            usuario
        })
    }
}



export { usuario }