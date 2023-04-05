import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js";

const generarJWT = (uid) => {

    const payload = { uid };
        const tok = jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"//4h
        })
        
        return tok

   /*  return new Promise((resolve, reject) => {
    
            const payload = { uid };
            jwt.sign(payload, process.env.CLAVESECRET, {
                expiresIn: "4h"//4h
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token")
                } else {
                    resolve(token)
                }
            }) 
    }) */
}


const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: " No hay token en la peticion"
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY) 

        let usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido- usuario probablemente no existe"//- usuario no existe DB
            })
        }


        if (usuario.estado == 0) {
            return res.status(401).json({
                msg: "Token no válido -usuario falso" //- usuario con estado: false
            })
        }

        req.usuario = usuario

        /* console.log("middleware carlitos"+usuario) */

        next();

    } catch (error) {
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}


export { generarJWT, validarJWT }

