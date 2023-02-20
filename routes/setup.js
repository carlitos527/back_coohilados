import {Router} from 'express'
import setup from '../controllers/setup.js'
import {check} from "express-validator"
import { validarCampos } from "../middlewares/validar-campos.js";

const router = new Router()

router.post('/',[

    check('consecutivoTrabajador', 'Se requiere un consecutivo',).not().isEmpty(),
    check('consecutivoTemporal', 'Se requiere un consecutivo',).not().isEmpty(),
    check('consecutivoDirecto', 'Se requiere un consecutivo',).not().isEmpty(),
   
   
    validarCampos
],setup.setupPost)

router.get('/',setup.setupGet)

router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],setup.setupGetId)


router.put('/:id',[
    check('id').isMongoId(),
    validarCampos
],setup.setupPut)


export default router