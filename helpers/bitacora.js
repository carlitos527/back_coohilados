
import Bitacora from "../models/bitacora.js"

const helpersBitacora = {
  existeBitacora: async (infoBitacora) => {
    const existe = await Bitacora.findOne({ infoBitacora });

    if (existe) {
      throw new Error(`La Bitacora ya está registrada`);
    }
  },

  guardarBitacora: async (idPersona, mensaje) => {
    if (idPersona && mensaje) {
      const bitacora = new Bitacora({ usuario: idPersona, mensaje })
      bitacora.save()

    } else {
      console.log('hable con el web master')
    }
  }

}
export default helpersBitacora
