import {Router} from 'express'
import { infoCiudad} from '../controllers/ciudad.js'
import  {validarCampos}  from '../middlewares/validar-campos.js'
import { check } from 'express-validator'
import  helpersCiudad  from '../helpers/ciudad.js'
import { validarJWT } from '../middlewares/validar-jwt.js'

const router = new Router()  

router.post('/',[
    check('Departamento', 'Este dato es requerido').not().isEmpty(),
    check('Ciudad', 'Este dato es requerido').not().isEmpty(), 
    check('Ciudad').custom(helpersCiudad.existeCiudad),
],infoCiudad.ciudadPost)
router.get('/',infoCiudad.ciudadGet)
router.get('/departamento/get',infoCiudad.departamentoGet)
router.get('/ciudad/get/:Departamento',infoCiudad.ciudadDepartamento)
router.get('/ciudades/:id',[
    check('id','El id debe ser mongoId').isMongoId(),
    validarCampos
],infoCiudad.ciudadGetId)
// router.get('/id/:id',[
//     check('id').isMongoId(),
//     validarCampos
// ],infoCiudad.ciudadGetId)

// router.get('/nombre/nombre/:ciudad',infoCiudad.ciudadNombreGet)
// router.get('/cod/ciu/ciu/ciu/:CodCiudad',infoCiudad.ciudadCodCiGet)
// router.get('/cod/dep/cod/dep/cod/:CodDepartamento',infoCiudad.ciudadCodDeGet)
// router.get('/nombre/dep/nombre/dep/nombre/:Departamento',infoCiudad.ciudadDepGet)



router.put('/:id',[
    check('id').isMongoId(),
    validarCampos
],infoCiudad.ciudadPut)

router.delete('/:id',[
    check('id').isMongoId(),
    validarCampos
],infoCiudad.ciudadDelete)

export default router