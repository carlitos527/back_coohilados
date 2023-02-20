import AreaTrabajo from "../models/areaTrabajo.js"

const helpersAreaTrabajo={
    existeAreaTrabajo: async (infoAreaTrabajo)=>{
        const existe = await AreaTrabajo.findOne({infoAreaTrabajo});

        if (existe){
            throw new error(`El area de trabajo ya existe`);
        }
    },

    guardarAreaTrabajo: async (idArea)=>{
        if (idArea){
            const areaTrabajo = new AreaTrabajo({nombre:idArea})
            areaTrabajo.save()
        }else{
            console.log('hable con el webMaster')
        }
    }
}

export default helpersAreaTrabajo