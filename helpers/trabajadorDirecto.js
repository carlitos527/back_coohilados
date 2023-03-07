
import Trabajador from "../models/trabajadorDirecto.js";


const helpersTrabajador={
    ciudadId:async (ciudad, req) => {
        if (ciudad) {   
            for (let i = 0; i < ciudad.length; i++) {
                const element = ciudad[i].idCiudad;
                var isValid =  mongoose.Types.ObjectId.isValid(element);                
                if (!isValid)throw new Error(`Id invalido!!! `)   
            }            
        }
    },

  existeTrabajador2ById: async (id) => {
    const existe = await Trabajador.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }
  },

  existeEmail: async (email) => {
    const existe = await Trabajador.findOne({ email }); 

    if (existe) {
      throw new Error(`El email ya está registrado`);
    }
  },

  existeIdenti: async (documento) => {
    const existe = await Trabajador.findOne({ documento });

    if (existe) {
      throw new Error(`Este numero de documento ya cuenta con un registro`);
    }
  }
  
};


export {helpersTrabajador};