import Bitacora from '../models/bitacora.js'

const bitacora = {
    bitacoraPost : async (req, res)=>{
        const {usuario, 
            mensaje,
        }=req.body
        const bitacoras = new Bitacora({usuario, mensaje})
        bitacoras.save()
        res.json({bitacoras})
        console.log(bitacora)
    },

    bitacoraGet : async (req, res)=>{
        const bitacora = await Bitacora.find() 
        res.json({
            bitacora  
        })
    }, 
    
    
}


export default bitacora