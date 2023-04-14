import { Router } from "express"
import { usuario } from "../controllers/usuario.js"
import { validarCampos } from "../middlewares/validar-campos.js"
import { check } from "express-validator"
import { helpersUsuario } from "../helpers/usuario.js"
import { validarJWT } from "../middlewares/validar-jwt.js"
import validarArchivo from "../middlewares/validar-archivo.js"

const router = new Router()

router.put("/resetearPassword/:id", [
    check('id').isMongoId(),
    validarCampos
],usuario.resetearPassword)

router.post('/', [
    check('documento', 'este campo es requerido').not().isEmpty(),
    check('documento', 'Favor ingrese un numero de documento').isLength({ min: 6 }),

    check('nombre', 'nombre no puede estar vacio').not().isEmpty(),
    check('nombre', 'nombre No puede tener mas de 40 caracteres').isLength({ max: 40 }),

    check('email', 'El correo que ingreso no es valido').isEmail(),
    check('email').custom(helpersUsuario.existeEmail),

    check('rol', 'este campo es requerido').not().isEmpty(),

    validarCampos
], usuario.usuarioPost)

router.post('/uploadinary/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarArchivo,
    validarCampos
], usuario.cargarArchivoCloud)

router.get('/', [
    validarCampos,

], usuario.usuarioGet)

router.get('/:id', [
    check('id').isMongoId(),
    validarCampos
], usuario.usuarioGetId)

router.get('/cc/nit/:documento', [


], usuario.usuarioGetIdent)

router.put('/:id', [
    check('id').isMongoId(),
    validarCampos
], usuario.usuarioPut)

router.put('/cambiarPassword/:id', [
    check('id', 'El campo id debe ser mongoId').isMongoId(),
    check('passwordActual', 'El campo password actual no puede estar vacia').not().isEmpty(),
    check('nuevaPassword', 'El campo nueva contraseña no puede estar vacia').not().isEmpty(),
    validarCampos
], usuario.cambiarPassword)

router.put('/activar/:id', [
    check('id').isMongoId(),

    validarCampos
], usuario.usuarioPutActiv)

router.put('/desactivar/:id', [
    check('id').isMongoId(),

    validarCampos
], usuario.usuarioPutDesactivar)

router.put('/vacaciones/:id', [
    check('id').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
    validarCampos
], usuario.usuarioPutVacaciones)

router.post('/login', [

    check('email', 'El correo que ingreso no es valido').isEmail(),
    check('password', 'La clave no es valida').isLength({ min: 6 }),
    validarCampos
], usuario.usuarioGetlogin)

router.put('/eliminar/:id', [
    check('id').isMongoId(),
    validarCampos
], usuario.usuarioPutEliminar)







export default router