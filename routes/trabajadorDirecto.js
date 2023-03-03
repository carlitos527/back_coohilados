import {Router} from 'express';
import directo from "../controllers/trabajadorDirecto.js";
import {check} from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { helpersTrabajador} from '../helpers/trabajadorDirecto.js';
import {validarJWT} from '../middlewares/validar-jwt.js'

const router = new Router()

router.post('/', [
    
    validarJWT, 

    
   
    check('nombre', 'nombre no puede estar vacio').not().isEmpty(),
    check('nombre', 'nombre No puede tener mas de 40 caracteres').isLength({ max: 40 }),

    check('sexo', 'sexo  no puede estar vacio ').not().isEmpty(),
    check('sexo', 'sexo No puede tener mas de 1 caracteres').isLength({ max: 1 }), 

    check('fechaNacimiento', 'Fecha de Nacimiento  no puede estar vacio ').not().isEmpty(), 
    check('fechaNacimiento', 'fecha de nacimineto No puede tener mas de 12 caracteres').isLength({ max: 12 }),

    check('lugarNacimiento', 'este campo es requerido').not().isEmpty(),


    check('tipoDocumento', 'este campo es requerido').not().isEmpty(),
    check('documento', 'Favor ingrese un numero de documento').isLength({ min: 6 }),

    check('email', 'El correo que ingreso no es valido').isEmail(),
    check('email').custom(helpersTrabajador.existeEmail),

    check('ciudad', 'este campo debe ser mongo Id').isMongoId(),
    check('ciudad', 'este campo es requerido').not().isEmpty(),

    check('direccion', 'direccion No puede estar vacio').not().isEmpty(),
    check('barrio', 'Barrio No puede estar vacio').not().isEmpty(),

    check('telefono', 'telefono No puede estar vacio').not().isEmpty(),
    check('telefono', 'telefono No puede tener mas de 10 caracteres').isLength({ max: 10 }),

    check('tipoContrato', 'El Tipo de contrato no puede estar vacio').not().isEmpty(),
    check('tipoContrato', 'El tipo de contrato No puede tener más de 30 caracteres').isLength({ max: 30 }),


    check('areaTrabajo', 'este campo debe ser mongo Id').isMongoId(),
    check('areaTrabajo','este campo es requerido').not().isEmpty(),
    check('areatrabajo', 'El area de trabajo No puede tener más de 20 caracteres').isLength({ max: 20 }),

    check('salario', 'El salario No puede estar vacio').not().isEmpty(),
    check('salario', 'El Salario No puede tener más de 10 caracteres').isLength({ max: 10 }),

    check('fechaInicio', 'la fecha de inicio  No puede estar vacio').not().isEmpty(),
    check('fechaInicio', 'La fecha de inicio No puede tener más de 10 caracteres').isLength({ max: 10 }),

    check('fechaFin', 'la fecha final de contrato  No puede estar vacio').not().isEmpty(),
    check('fechaFin', 'La fecha final del contrato No puede tener más de 10 caracteres').isLength({ max: 10 }),



    validarCampos

], directo.Trabajador2Post)


router.get('/', [
    validarCampos,
   
], directo.trabajadorGet)

router.get('/:id', [
    check('id').isMongoId(),
    validarCampos
], directo.trabajadorGetId)

router.get('/cc/nit/:documento',[
    
 
], directo.trabajadorGetIdent)


 router.put('/:id', [
     check('id').isMongoId(), 
    validarCampos
 ], directo.trabajadorPut)

router.put('/activar/:id', [
    check('id').isMongoId(),
   
    validarCampos
], directo.trabajadorPutActiv)

router.put('/desactivar/:id', [
    check('id').isMongoId(),
    
    validarCampos
], directo.trabajadorPutDesactivar)

router.put('/vacaciones/:id', [
    check('id').isMongoId(),
    check('id').custom(helpersTrabajador.existeTrabajador2ById),
    validarCampos
], directo.trabajadorPutVacaciones) 


router.delete('/:id',[
    check('id').isMongoId(),
    validarCampos
],directo.trabajadorDelete)







export default router