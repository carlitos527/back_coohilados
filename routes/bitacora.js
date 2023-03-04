
import {Router} from 'express'
import Bitacora from '../controllers/bitacora.js'
import {check} from "express-validator"
import { validarCampos } from "../middlewares/validar-campos.js";

const router = new Router()


router.post('/',[ 
    check('usuario', 'El campo es obligatorio').isMongoId(),
    check('mensaje', 'El campo es obligatorio').not().isEmpty(),
    
    validarCampos
],Bitacora.bitacoraPost)
router.get('/',Bitacora.bitacoraGet)



export default router

