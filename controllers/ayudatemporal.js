
import ayudaTemporal from '../models/ayudaTemporal.js';


const temporal = {
  temporalPost: async (req, res) => {
    try {

      const {
        tipoDocumento,
        documento,
        nombre,
        tipo,
        pension,
        rh,
        arl,
        eps,
        sexo,
        barrio,
        email,
        ciudad,
        telefono,
        fechaNacimiento,
        fechaInicio,
        fechaFin,
        tipoContrato,
        salario,
        areaTrabajo,
        rol,
        anotacion,
        estado } = req.body

      /* let fechaI = new Date(fechaInicio);
      let fechaF = new Date(fechaFin);
      let fecha = ((fechaF - fechaI) / (24 * 60 * 60 * 1000)) */

      const temporal = new ayudaTemporal({
        tipoDocumento,
        documento,
        nombre,
        tipo,
        pension,
        rh,
        arl,
        eps,
        sexo,
        email,
        ciudad,
        barrio,
        telefono,
        fechaNacimiento,
        fechaInicio,
        fechaFin,
        tipoContrato,
        salario,
        areaTrabajo,
        rol,
        anotacion,
        estado
      });

      if (!temporal) {
        return res.status(400).json({ msg: "No se puedo registrar el trabajador temporal" });
      }
      temporal.save();
      res.json({ temporal });

    } catch (error) {
      return res.status(500).json({ msg: "el trabajador temporal no pudo ser ingresado hable con el web master carlitos" })
    }
  },
  temporalActivoGet: async (req, res) => {
    try {

      const temporal = await ayudaTemporal.find({ estado: 1 })
        .populate({ path: 'areaTrabajo' });
      if (!temporal) { return res.status(400).json({ msj: "No se encontraron trabajadores Temporal activos" }) }
      res.json({ temporal })

    } catch (error) {
      return res.status(500).json({ msj: "hable con el web master carlitox" })

    }

  },
  temporalGet: async (req, res) => {
    try {
      const temporal = await ayudaTemporal.find().populate({ path: 'areaTrabajo' })

      res.json({
        temporal
      })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }

  },
  temporalGetId: async (req, res) => {
    try {
      const { id } = req.params
      const temporal = await ayudaTemporal.findById(id)

      res.json({
        temporal
      })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }

  },
  temporalGetIdent: async (req, res) => {
    try {
      const { documento } = req.params
      const temporal = await areaTrabajo.find({ documento })
        .populate("documento", ["nombre"])

      console.log(documento)
      res.json({
        temporal
      })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  temporalPut: async (req, res) => {
    try {
      const { id } = req.params;
      const { _id, createdAt, estado, ...resto } = req.body;
      const temporal = await ayudaTemporal.findByIdAndUpdate(id, resto);

      res.json({
        temporal
      })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  temporalPutActiv: async (req, res) => {
    try {
      const { id } = req.params;
      const temporal = await ayudaTemporal.findByIdAndUpdate(id, { estado: 1 });

      res.json({
        temporal
      })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  temporalPutDesactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const temporal = await ayudaTemporal.findByIdAndUpdate(id, { estado: 2 });

      res.json({
        temporal
      })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  temporalPutVacaciones: async (req, res) => {
    try {
      const { id } = req.params;
      const temporal = await ayudaTemporal.findByIdAndUpdate(id, { estado: 3 });

      res.json({
        temporal
      })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  },
  temporalDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const temporal = await ayudaTemporal.findByIdAndDelete(id);
      res.json({
        temporal
      })
    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }
  }
}
export default temporal 
