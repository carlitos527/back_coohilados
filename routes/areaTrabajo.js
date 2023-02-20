import {Router} from 'express'
import areaTrabajo from '../controllers/areaTrabajo.js'
import {check} from "express-validator"
import { validarCampos } from "../middlewares/validar-campos.js";
import  helpersAreaTrabajo  from '../helpers/areaTrabajo.js'


const router = new Router()

router.post('/',[
    check('nombre', 'El campo es obligatorio').not().isEmpty(),
    check('nombre').custom(helpersAreaTrabajo.existeAreaTrabajo),
   validarCampos,
],areaTrabajo.areaPost) 

router.get('/', [
    validarCampos,
], areaTrabajo.areaGet)

router.get('/:id', [
    check('id').isMongoId(),
    validarCampos
], areaTrabajo.areaGetId) 

router.put('/:id', [
    check('id').isMongoId(),
    validarCampos
], areaTrabajo.areaPut)

router.delete('/:id', [
    check('id').isMongoId(),
    validarCampos
], areaTrabajo.areaDelete)

export default router