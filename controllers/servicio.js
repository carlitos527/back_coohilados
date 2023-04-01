import Servicio from '../models/servicio.js'
import Setup from '../models/setup.js'
import helpersBitacora from '../helpers/bitacora.js';


const servicio = {
  TrabajadorPost: async (req, res) => { 

    try {
      const {
        nombre,
        tipo,
        sexo,
        fechaNacimiento,
        tipoDocumento,
        documento,
        email,
        ciudad,
        barrio,
        telefono,
        tipoContrato,
        cargo,
        areaTrabajo,
        salario,
        fechaInicio,
        fechaVacaciones,
        rol,
        anotacion,
        estado } = req.body
  
        const consecutivo = await Setup.findOne();
        let conse="";
        if (consecutivo.consecutivoTrabajador.toString().length ==1){
          conse =`000${consecutivo.consecutivoTrabajador}`;
        }else if (consecutivo.consecutivoTrabajador.toString().length == 2) {
          conse=`00${consecutivo.consecutivoTrabajador}`;
        }else if (consecutivo.consecutivoTrabajador.toString().length ==3){
          conse=`0${consecutivo.consecutivoTrabajador}`;
        }else {
          conse = consecutivo.consecutivoTrabajador;
        }
  
        const d = new Date();
        let year = d.getFullYear();
        let cotiNumero ="".concat(conse, "-", year, "-"+"V1");
        
        console.log("conca:  "+cotiNumero);
  
        let consecutivotrabajador = consecutivo.consecutivoTrabajador+ 1;
        const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
          consecutivoTrabajador:consecutivotrabajador
        });
        
        if (!guardar){
          return res.status(400)
          .json({
            msg:"No se puede actualizar la información del trabajador"
          });
        };

        
      const trabajador = new Servicio({ 
        nombre,
        tipo,
        sexo,
        fechaNacimiento,
        tipoDocumento,
        documento,
        email,
        ciudad,
        barrio,
        telefono,
        tipoContrato,
        cargo,
        areaTrabajo,
        salario,
        fechaInicio,
        fechaVacaciones,
        anotacion,
        rol,
        estado
      });
  
      if(!trabajador){
        return res
          .status(400)
          .json({msg:"No se puedo registrar el trabajador "});
      }
      
      trabajador.save();
      const usuario =req.usuario
      let idPersona =usuario._id;
      let mensaje=`el trabajador Asociado fue registrado exitosamente, por ${usuario.nombre}`
  
      res.json({ trabajador });
  
      console.log(ciudad)
  
      helpersBitacora.guardarBitacora(idPersona, mensaje)  
  
    } catch (error) {
      return res.status(500).json({ msg: "No se pudo crear el trabajador asociado, hable con el web master carlitos" }) 
    }
    
  },
  trabajadorActivoGet:async (req,res)=>{
    try {
      const trabajador = await Servicio.find({estado:1})
      .populate({path:'areaTrabajo'});
      if (!trabajador){return res.status(400).json({msj: "No se encontraron trabajadores ASOCIADOS activos"})}
      res.json({ trabajador})
    } catch (error) {
      return res.status(500).json({msj:"hable con el web master carlitox"})
      
    }

  },

  trabajadorGet: async (req, res) => {
    try {
    const trabajador = await Servicio.find().populate({path:'areaTrabajo'})
    res.json({
      trabajador
    }) 
  } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }

  },
  trabajadorGetId: async (req, res) => {
    try {
    const { id } = req.params
    const trabajador = await Servicio.findById(id)

    res.json({
      trabajador
    })
  } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }

  },
  trabajadorGetIdent: async (req, res) => {  
    try {
    const { documento } = req.params
    const trabajador = await Servicio.find({ documento })
      .populate("documento", ["nombre"])
    console.log(documento)
    res.json({
      trabajador
    })
    console.log(trabajador)
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPut: async (req, res) => {
    try {
    const { id } = req.params;
    const { _id, createAdt, estado, ...resto } = req.body;
    const trabajador = await Servicio.findByIdAndUpdate(id, resto);

    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutActiv: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador = await Servicio.findByIdAndUpdate(id, { estado:1});

    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutDesactivar: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador = await Servicio.findByIdAndUpdate(id, { estado:2 });

    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutVacaciones: async (req, res) => {
    try {

    const { id } = req.params;
    const trabajador = await Servicio.findByIdAndUpdate(id, { estado:3 });

    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorDelete: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador = await servicio.findByIdAndDelete(id);
    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  }
}

export { servicio }
