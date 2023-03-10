import { Router } from "express"
import { usuario } from "../controllers/usuario.js"
import { validarCampos } from "../middlewares/validar-campos.js"
import { check } from "express-validator"
import { helpersUsuario } from "../helpers/usuario.js"
import { validarJWT } from "../middlewares/validar-jwt.js"

const router = new Router()


router.post('/', [
   
    

    check('tipoDocumento', 'este campo es requerido').not().isEmpty(),
    check('documento', 'Favor ingrese un numero de documento').isLength({ min: 6 }),

    check('nombre', 'nombre no puede estar vacio').not().isEmpty(),
    check('nombre', 'nombre No puede tener mas de 40 caracteres').isLength({ max: 40 }),

    check('direccion', 'Barrio No puede estar vacio').not().isEmpty(),
    check('direccion', 'Barrio No puede tener mas de 50 caracteres').isLength({ max: 50 }),

    check('ciudad', 'este campo debe ser mongo Id').isMongoId(),
    check('ciudad', 'este campo es requerido').not().isEmpty(),

    check('telefono', 'telefono No puede estar vacio').not().isEmpty(),
    check('telefono', 'telefono No puede tener mas de 30 caracteres').isLength({ max: 30 }),

    check('email', 'El correo que ingreso no es valido').isEmail(),
    check('email').custom(helpersUsuario.existeEmail),

    check('password', 'este campo es requerido').not().isEmpty(),
    check('password', 'Favor ingrese una contraseña').isLength({ min: 8 }),

    check('rol', 'este campo es requerido').not().isEmpty(),


    validarCampos
], usuario.usuarioPost)


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

router.put('/activar/:id', [
    check('id').isMongoId(),

    validarCampos
], usuario.usuarioPutActiv)

router.put('/desactivar/desactivar/:id', [
    check('id').isMongoId(),

    validarCampos
], usuario.usuarioPutDesactivar)

router.put('/usuario/put/vacaciones/:id', [
    check('id').isMongoId(),
    check('id').custom(helpersUsuario.existeUsuarioById),
    validarCampos
], usuario.usuarioPutVacaciones) 


router.post('/login', [

    check('email', 'El correo que ingreso no es valido').isEmail(),
    check('password', 'La clave no es valida').isLength({ min: 6 }),
    validarCampos
], usuario.usuarioGetlogin)






export default router