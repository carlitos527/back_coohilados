import Pension from "../models/pension.js";

const pension = {
    crearPension : async (req, res) => {
        try {
            const {hombre,mujer} = req.body;

            const pension = new Pension({hombre,mujer})
            if(!pension){
                return res.status(400).json({msg:"No se pudo crear el registro de pensión"})
            }
            pension.save();
            res.json({pension})
        } catch (error) {
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }
    },
    modificarPension: async (req,res)=>{
        try {
            const {id}=req.params
            const {_id, createAdt, ...resto}=req.body;

            const pension = await Pension.findByIdAndUpdate(id,resto);
            if(!pension){
                return res.status(400).json({msg:"No se pudo actualizar la edad de pensión"})
            }
            res.json({pension})

        } catch (error) {
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }
    },
    verPensiones : async (req,res)=>{
        try {
            const pension = await Pension.find();
            if(!pension){
                return res.status(400).json({msg:"No se encontraron registro de pensión"})
            }
            res.json({pension})
        } catch (error) {
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }
    }
}

export default pension