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
    check('nombre', 'nombre No puede tener mas de 40 caracteres').isLength({ max: 40 }),   
    check('sexo', 'sexo  no puede estar vacio ').not().isEmpty(),
    check('sexo', 'sexo No puede tener mas de 1 caracteres').isLength({ max: 1 }),
    check('fechaNacimiento', 'Fecha de Nacimiento  no puede estar vacio ').not().isEmpty(),
    check('fechaNacimiento', 'fecha de nacimineto No puede tener mas de 12 caracteres').isLength({ max: 12 }),
    check('fechaInicio', 'la fecha de inicio  No puede estar vacio').not().isEmpty(),
    check('fechaInicio', 'La fecha de inicio No puede tener más de 10 caracteres').isLength({ max: 10 }),
    check('fechaFin', 'la fecha final de contrato  No puede estar vacio').not().isEmpty(),
    check('fechaFin', 'La fecha final del contrato No puede tener más de 10 caracteres').isLength({ max: 10 }),
    
    check('areaTrabajo', 'este campo debe ser mongo Id').isMongoId(),
    check('areaTrabajo','este campo es requerido').not().isEmpty(),
    check('areatrabajo', 'El area de trabajo No puede tener más de 20 caracteres').isLength({ max: 20 }),
], temporal.temporalPost)


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
