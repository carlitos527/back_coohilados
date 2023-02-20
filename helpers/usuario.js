import mongoose from "mongoose";
import Usuario from "../models/usuario.js";

const helpersUsuario = {
  
    ciudadId:async (ciudad, req) => {
        if (ciudad) {   
            for (let i = 0; i < ciudad.length; i++) {
                const element = ciudad[i].idCiudad;
                var isValid =  mongoose.Types.ObjectId.isValid(element);                
                if (!isValid)throw new Error(`Id invalido!!! `)   
            }            
        }
    },

  existeUsuarioById: async (id) => {
    const existe = await Usuario.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }
  },

  existeEmail: async (email) => {
    const existe = await Usuario.findOne({ email });

    if (existe) {
      throw new Error(`El email ya está registrado`);
    }
  },

  existeIdenti: async (documento) => {
    const existe = await Usuario.findOne({ documento });

    if (existe) {
      throw new Error(`Este numero de documento ya cuenta con un registro`);
    }
  }
  
};
export { helpersUsuario };
