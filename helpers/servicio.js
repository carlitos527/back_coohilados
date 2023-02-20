import Servicio from "../models/servicio.js";


const helpersServicio={
    ciudadId:async (ciudad, req) => {
        if (ciudad) {   
            for (let i = 0; i < ciudad.length; i++) {
                const element = ciudad[i].idCiudad;
                var isValid =  mongoose.Types.ObjectId.isValid(element);                
                if (!isValid)throw new Error(`Id invalido!!! `)   
            }            
        }
    },

  existeTrabajadorById: async (id) => {
    const existe = await Servicio.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }
  },

  existeEmail: async (email) => {
    const existe = await Servicio.findOne({ email });

    if (existe) {
      throw new Error(`El email ya está registrado`);
    }
  },

  existeIdenti: async (documento) => {
    const existe = await Servicio.findOne({ documento });

    if (existe) {
      throw new Error(`Este numero de documento ya cuenta con un registro`);
    }
  }
  
};


export {helpersServicio};