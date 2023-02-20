import ayudaTemporal from "../models/ayudaTemporal.js";

const helpersAyudaTemporal = {
  

  existeTemporalById: async (id) => {
    const existe = await ayudaTemporal.findById(id);

    if (!existe) {
      throw new Error(`El id no existe ${id}`);
    }
  },

 

  existeIdenti: async (documento) => {
    const existe = await ayudaTemporal.findOne({ documento });

    if (existe) {
      throw new Error(`Este numero de documento ya cuenta con un registro`);  
    }
  }
  
};

export default helpersAyudaTemporal ;