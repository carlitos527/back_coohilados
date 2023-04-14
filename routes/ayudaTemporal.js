import {Router} from 'express';
import temporal from "../controllers/ayudatemporal.js";
import {check} from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import helpersAyudaTemporal  from '../helpers/ayudaTemporal.js';
import {validarJWT} from '../middlewares/validar-jwt.js' 


 
const router = new Router()

router.post('/agregar',validarJWT, [

    check('tipoDocumento', 'este campo es requerido').not().isEmpty(),
    check('documento', 'Favor ingrese un numero de documento').isLength({ min: 6 }),
    check('docuemnto').custom(helpersAyudaTemporal.existeIdenti),

    check('nombre', 'nombre no puede estar vacio').not().isEmpty(),
    check('nombre', 'nombre No puede tener mas de 50 caracteres').isLength({ max: 50 }),  

    check('tipo', 'tipo  no puede estar vacio ').not().isEmpty(),

    check('pension', 'Pension puede estar vacio ').not().isEmpty(),
    check('pension', 'Pension No puede tener mas de 15 caracteres').isLength({ max: 15 }),


    check('rh', 'rh puede estar vacio ').not().isEmpty(),
    check('rh', 'rh No puede tener mas de 50 caracteres').isLength({ max: 5 }),

    check('arl', 'arl no puede estar vacio ').not().isEmpty(),
    check('arl', 'arl No puede tener mas de 50 caracteres').isLength({ max: 50 }),

    check('eps', 'eps  no puede estar vacio ').not().isEmpty(),
    check('eps', 'eps No puede tener mas de 50 caracteres').isLength({ max: 50 }),
    

    check('fechaNacimiento', 'Fecha de Nacimiento  no puede estar vacio ').not().isEmpty(),
    check('fechaNacimiento', 'fecha de nacimineto No puede tener mas de 30 caracteres').isLength({ max: 30 }),


    check('sexo', 'sexo  no puede estar vacio ').not().isEmpty(),
    check('sexo', 'sexo No puede tener mas de 1 caracteres').isLength({ max: 1 }),


    check('barrio', 'Barrio No puede estar vacio').not().isEmpty(),
    check('barrio', 'Barrio No puede tener mas de 50 caracteres').isLength({ max: 50 }),

    check('email', 'El correo que ingreso no es valido').isEmail(),
    check('email').custom(helpersAyudaTemporal.existeEmail),

    check('ciudad', 'este campo debe ser mongo Id').isMongoId(),
    check('ciudad', 'este campo es requerido').not().isEmpty(),

    check('telefono', 'telefono No puede estar vacio').not().isEmpty(),
    check('telefono', 'telefono No puede tener mas de 30 caracteres').isLength({ max: 30 }),

    
    check('fechaInicio', 'la fecha de inicio  No puede estar vacio').not().isEmpty(),
    check('fechaInicio', 'La fecha de inicio No puede tener más de 30 caracteres').isLength({ max: 30 }),
    
    check('fechaFin', 'la fecha final de contrato  No puede estar vacio').not().isEmpty(),
    check('fechaFin', 'La fecha final del contrato No puede tener más de 30 caracteres').isLength({ max: 30 }),

    check('tipoContrato', 'El Tipo de contrato no puede estar vacio').not().isEmpty(),
    check('tipoContrato', 'El tipo de contrato No puede tener más de 50 caracteres').isLength({ max: 50 }),

    check('salario', 'El salario No puede estar vacio').not().isEmpty(),
    check('salario', 'El Salario No puede tener más de 30 caracteres').isLength({ max: 30 }),
    
    check('areaTrabajo', 'este campo debe ser mongo Id').isMongoId(),
    check('areaTrabajo','este campo es requerido').not().isEmpty(),
    check('areatrabajo', 'El area de trabajo No puede tener más de 30 caracteres').isLength({ max: 50 }),
], temporal.temporalPost)

router.get('/activo',temporal.temporalActivoGet)

router.get('/', [
    validarCampos,
   
], temporal.temporalGet)

router.get('/:id', [
    check('id').isMongoId(), 
    validarCampos
], temporal.temporalGetId)

router.get('/cc/nit/:documento',[
    
 
], temporal.temporalGetIdent)


 router.put('/:id', [
     check('id').isMongoId(),
    validarCampos
 ], temporal.temporalPut)

router.put('/activar/:id', [
    check('id').isMongoId(),
   
    validarCampos
], temporal.temporalPutActiv)

router.put('/desactivar/:id', [   
    check('id').isMongoId(), 
    
    validarCampos
], temporal.temporalPutDesactivar) 

router.put('/vacaciones/:id', [
    check('id').isMongoId(),
    check('id').custom(helpersAyudaTemporal.existeTemporalById),
    validarCampos
], temporal.temporalPutVacaciones)

 
router.delete('/:id',[
    check('id').isMongoId(),
    validarCampos
], temporal.temporalDelete)

export default router
