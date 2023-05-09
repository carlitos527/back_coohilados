import Aportante from "../models/aportante.js";


const helpersAportante={
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
    const existe = await Aportante.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }
  },

  existeEmail: async (email) => {
    const existe = await Aportante.findOne({ email });

    if (existe) {
      throw new Error(`El email ya está registrado`);
    }
  },

  existeIdenti: async (documento) => {
    const existe = await Aportante.findOne({ documento });

    if (existe) {
      throw new Error(`Este numero de documento ya cuenta con un registro`);
    }
  }
  
};


export {helpersAportante};