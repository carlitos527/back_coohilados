
import ayudaTemporal from '../models/ayudaTemporal.js';
import Setup from '../models/setup.js'
import helpersBitacora from '../helpers/bitacora.js';


const temporal = {
  temporalPost: async (req, res) => {
    try {
      
    const {
       tipoDocumento,
        documento,
        nombre,
        tipo,
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
        estado} = req.body

    const consecutivo = await Setup.findOne();
    let conse = "";
    if (consecutivo.consecutivoTemporal.toString().length == 1) {
      conse = `000${consecutivo.consecutivoTemporal}`;
    } else if (consecutivo.consecutivoTemporal.toString().length == 2) {
      conse = `00${consecutivo.consecutivoTemporal}`;
    } else if (consecutivo.consecutivoTemporal.toString().length == 3) {
      conse = `0${consecutivo.consecutivoTemporal}`;
    } else {
      conse = consecutivo.consecutivoTemporal;
    }
    const d = new Date();
    let year = d.getFullYear();
    let cotiNumero = "".concat(conse, "-", year, "-" + "V1");
    /* console.log(''.concat(conse,'-',year,'V1')); */
    console.log("conca: " + cotiNumero);
    /* consecutivo.consecutivoOferta++ */
    let consecutivotemporal = consecutivo.consecutivoTemporal + 1;
    const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
      consecutivoTemporal: consecutivotemporal,
    });
    if (!guardar) {
      return res
        .status(400)
        .json({
          msg: "No se pudo actualizar la informacion del consecutivo Temporal",
        });
    };

    let fechaI = new Date(fechaInicio);
    let fechaF = new Date(fechaFin);
    let fecha = ((fechaF - fechaI) / (24 * 60 * 60 * 1000))

    const temporal = new ayudaTemporal({ 
      tipoDocumento,
      documento,
      nombre,
      tipo,
      sexo,
      email,
      ciudad,
      barrio,
      telefono,
      fechaNacimiento,
      fechaInicio,
      fechaFin,
      tiempoLaborado: fecha,
      tipoContrato,
      salario,
      areaTrabajo,
      rol,
      anotacion,
      estado
    });

    if (!temporal) {
      return res
        .status(400)
        .json({ msg: "No se puedo registrar el trabajador temporal" });
    }
    temporal.save();
    res.json({ temporal });

    const usuario = req.usuario
    let idPersona = usuario._id;
    let mensaje = `El trabajador temporal fue registrada exitosamente, por ${usuario.nombre}`
    helpersBitacora.guardarBitacora(idPersona, mensaje)

  } catch (error) {
    return res.status(500).json({msg:"el trabajador temporal no pudo ser ingresado hable con el web master carlitos"})
      
  }
  },
  temporalGet: async (req, res) => {
    const temporal = await ayudaTemporal.find().populate({path:'areaTrabajo'}) 

    res.json({
      temporal
    })
  },
  temporalGetId: async (req, res) => {
    const { id } = req.params
    const temporal = await ayudaTemporal.findById(id) 

    res.json({
      temporal
    })
  },
  temporalGetIdent: async (req, res) => {

    const { documento } = req.params
    const temporal = await areaTrabajo.find({ documento })  
      .populate("documento", ["nombre"])

    console.log(documento) 
    res.json({
      temporal
    })
    console.log(temporal)
  },
  temporalPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, estado, ...resto } = req.body;
    const temporal = await ayudaTemporal.findByIdAndUpdate(id, resto);

    res.json({
      temporal
    })
  },

  temporalPutActiv: async (req, res) => {
    const { id } = req.params;
    const temporal = await ayudaTemporal.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      temporal
    })
  },
  temporalPutDesactivar: async (req, res) => {
    const { id } = req.params;
    const temporal = await ayudaTemporal.findByIdAndUpdate(id, { estado: 2 });

    res.json({
      temporal
    })
  },
  temporalPutVacaciones: async (req, res) => {
    const { id } = req.params;
    const temporal = await ayudaTemporal.findByIdAndUpdate(id, { estado: 3 }); 

    res.json({
      temporal
    })
  },

  temporalDelete: async (req, res) => {
    const { id } = req.params;
    const temporal = await ayudaTemporal.findByIdAndDelete(id); 
    res.json({
      temporal
    })
  }

}


export default temporal 
