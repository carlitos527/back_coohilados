import {Router} from "express";
import {check} from "express-validator";
import pension from "../controllers/pension.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = new Router();

router.post('/',[
    check('hombre','El campo edad de hombre no puede estar vacio').not().isEmpty(),
    check('mujer','El campo de mujer no puede estar vacio').not().isEmpty(),
    validarCampos
],pension.crearPension)

router.put('/modificar/:id',[
    check('id','El campo id no puede estar vacio').not().isEmpty(),
    check('id','El campo id debe ser mongoId').isMongoId(),
    validarCampos
],pension.modificarPension)

router.get('/ver',pension.verPensiones)

export default router