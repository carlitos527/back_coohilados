import {Router} from 'express';
import {aportante} from "../controllers/aportante.js";
import {check} from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { helpersAportante } from '../helpers/aportante.js';
import {validarJWT} from '../middlewares/validar-jwt.js'

const router = new Router()

router.post('/agregar', [
    validarJWT,
   
    check('tipoDocumento', 'este campo es requerido').not().isEmpty(),
    check('documento', 'Favor ingrese un numero de documento').isLength({ min: 6 }),

    check('nombre', 'nombre no puede estar vacio').not().isEmpty(),
    check('nombre', 'nombre No puede tener mas de 40 caracteres').isLength({ max: 40 }),

    check('sexo', 'sexo  no puede estar vacio ').not().isEmpty(),
    check('sexo', 'sexo No puede tener mas de 1 caracteres').isLength({ max: 1 }),

    check('fechaNacimiento', 'Fecha de Nacimiento  no puede estar vacio ').not().isEmpty(),
    check('fechaNacimiento', 'fecha de nacimineto No puede tener mas de 12 caracteres').isLength({ max: 12 }),

    check('email', 'El correo que ingreso no es valido').isEmail(),
    check('email').custom(helpersAportante.existeEmail),

    check('ciudad', 'este campo debe ser mongo Id').isMongoId(),
    check('ciudad', 'este campo es requerido').not().isEmpty(),

 
    check('barrio', 'Barrio No puede estar vacio').not().isEmpty(),
    check('barrio', 'Barrio No puede tener mas de 50 caracteres').isLength({ max: 50 }),

    check('telefono', 'telefono No puede estar vacio').not().isEmpty(),
    check('telefono', 'telefono No puede tener mas de 30 caracteres').isLength({ max: 30 }),

    check('fechaInicio', 'la fecha de inicio  No puede estar vacio').not().isEmpty(),
    check('fechaInicio', 'La fecha de inicio No puede tener más de 30 caracteres').isLength({ max: 30 }),

    check('fechaFin', 'la fecha Vacaciones del trabajador No puede estar vacio').not().isEmpty(),
    check('fechaFin', 'La fecha Vacaciones del trabajador No puede tener más de 30 caracteres').isLength({ max: 30 }),



    validarCampos

], aportante.TrabajadorPost)


router.get('/', [
    validarCampos,
   
], aportante.trabajadorGet)

router.get('/activo',aportante.trabajadorActivoGet)

router.get('/:id', [
    check('id').isMongoId(),
    validarCampos
], aportante.trabajadorGetId)

router.get('/cc/nit/:documento',[
    
 
], aportante.trabajadorGetIdent)


 router.put('/:id', [
     check('id').isMongoId(),
    validarCampos
 ], aportante.trabajadorPut)

router.put('/activar/:id', [
    check('id').isMongoId(),
   
    validarCampos
], aportante.trabajadorPutActiv)

router.put('/desactivar/:id', [
    check('id').isMongoId(),
    
    validarCampos
], aportante.trabajadorPutDesactivar)

router.put('/fin/:id', [
    check('id').isMongoId(),
    check('id').custom(helpersAportante.existeTrabajadorById),
    validarCampos
], aportante.trabajadorPutFin)


router.delete('/:id',[
    check('id').isMongoId(),
    validarCampos
],aportante.trabajadorDelete)







export default router