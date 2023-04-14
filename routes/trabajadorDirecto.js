import {Router} from 'express';
import directo from "../controllers/trabajadorDirecto.js";
import {check} from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { helpersTrabajador} from '../helpers/trabajadorDirecto.js';
import {validarJWT} from '../middlewares/validar-jwt.js'

const router = new Router()

router.post('/', [
    
    validarJWT, 
    check('tipoDocumento', 'este campo es requerido').not().isEmpty(),
    check('documento', 'Favor ingrese un numero de documento').isLength({ min: 6 }),

    check('nombre', 'nombre no puede estar vacio').not().isEmpty(),
    check('nombre', 'nombre No puede tener mas de 40 caracteres').isLength({ max: 40 }),

    check('tipo', 'tipo  no puede estar vacio ').not().isEmpty(),
    
    check('pension', 'Pension puede estar vacio ').not().isEmpty(),
    check('pension', 'Pension No puede tener mas de 15 caracteres').isLength({ max: 15 }),

    check('rh', 'rh puede estar vacio ').not().isEmpty(),
    check('rh', 'rh No puede tener mas de 50 caracteres').isLength({ max: 5 }),

    check('arl', 'arl no puede estar vacio ').not().isEmpty(),
    check('arl', 'arl No puede tener mas de 50 caracteres').isLength({ max: 50 }),

    check('eps', 'eps  no puede estar vacio ').not().isEmpty(),
    check('eps', 'eps No puede tener mas de 50 caracteres').isLength({ max: 50 }),

    check('sexo', 'sexo  no puede estar vacio ').not().isEmpty(),
    check('sexo', 'sexo No puede tener mas de 1 caracteres').isLength({ max: 1 }),

    check('fechaNacimiento', 'Fecha de Nacimiento  no puede estar vacio ').not().isEmpty(),
    check('fechaNacimiento', 'fecha de nacimineto No puede tener mas de 30 caracteres').isLength({ max: 30 }),

    check('email', 'El correo que ingreso no es valido').isEmail(),
    check('email').custom(helpersTrabajador.existeEmail),

    check('ciudad', 'este campo debe ser mongo Id').isMongoId(),
    check('ciudad', 'este campo es requerido').not().isEmpty(),

 
    check('barrio', 'Barrio No puede estar vacio').not().isEmpty(),
    check('barrio', 'Barrio No puede tener mas de 50 caracteres').isLength({ max: 50 }),

    check('telefono', 'telefono No puede estar vacio').not().isEmpty(),
    check('telefono', 'telefono No puede tener mas de 30 caracteres').isLength({ max: 30 }),

    check('tipoContrato', 'El Tipo de contrato no puede estar vacio').not().isEmpty(),
    check('tipoContrato', 'El tipo de contrato No puede tener más de 50 caracteres').isLength({ max: 50 }),


    check('areaTrabajo', 'este campo debe ser mongo Id').isMongoId(),
    check('areaTrabajo','este campo es requerido').not().isEmpty(),
    check('areatrabajo', 'El area de trabajo No puede tener más de 50 caracteres').isLength({ max: 50 }),

    check('salario', 'El salario No puede estar vacio').not().isEmpty(),
    check('salario', 'El Salario No puede tener más de 30 caracteres').isLength({ max: 30 }),

    check('fechaInicio', 'la fecha de inicio  No puede estar vacio').not().isEmpty(),
    check('fechaInicio', 'La fecha de inicio No puede tener más de 30 caracteres').isLength({ max: 30 }),

    check('fechaFin', 'la fecha final de contrato  No puede estar vacio').not().isEmpty(),
    check('fechaFin', 'La fecha final del contrato No puede tener más de 30 caracteres').isLength({ max: 30 }),



    validarCampos

], directo.Trabajador2Post)

router.get('/activo',directo.trabajador2ActivoGet)


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