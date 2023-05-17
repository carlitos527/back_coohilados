import Aportante from '../models/aportante.js'



const aportante = {
  TrabajadorPost: async (req, res) => { 

    try {
      const {
        tipoDocumento,
        documento,
        nombre,
        tipo,
        sexo,
        fechaNacimiento,
        email,
        ciudad,
        barrio,
        telefono,
        fechaInicio,
        fechaFin,
        rol,
        anotacion,
        estado } = req.body
  
      const trabajador3 = new Aportante({ 
        tipoDocumento,
        documento,
        nombre,
        tipo,
        sexo,
        fechaNacimiento,
        email,
        ciudad,
        barrio,
        telefono,
        fechaInicio,
        fechaFin,
        rol,
        anotacion,
        estado
      });
  
      if(!trabajador3){
        return res.status(400).json({msg:"No se puedo registrar el trabajador "});
      }
      trabajador3.save();
      res.json({ trabajador3 });
  
    } catch (error) {
      return res.status(500).json({ msg: "No se pudo crear el trabajador asociado, hable con el web master carlitos" }) 
    }
  },
  trabajadorActivoGet:async (req,res)=>{
    try {
      const trabajador3 = await Aportante.find({estado:1})
      if (!trabajador3){return res.status(400).json({msj: "No se encontraron trabajadores ASOCIADOS activos"})}
      res.json({ trabajador3})
    } catch (error) {
      return res.status(500).json({msj:"hable con el web master carlitox"})
      
    }

  },
  trabajadorGet: async (req, res) => {
    try {
    const trabajador3 = await Aportante.find()
    res.json({
      trabajador3
    }) 
  } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster  carlitos" })
    }

  },
  trabajadorGetId: async (req, res) => {
    try {
    const { id } = req.params
    const trabajador3 = await Aportante.findById(id)

    res.json({
      trabajador3
    })
  } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }

  },
  trabajadorGetIdent: async (req, res) => {  
    try {
    const { documento } = req.params
    const trabajador3 = await Aportante.find({ documento })
      .populate("documento", ["nombre"])
    console.log(documento)
    res.json({
      trabajador3
    })
    console.log(trabajador3)
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPut: async (req, res) => {
    try {
    const { id } = req.params;
    const { _id, createAdt, estado, ...resto } = req.body;
    const trabajador3 = await Aportante.findByIdAndUpdate(id, resto);

    res.json({
      trabajador3
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutActiv: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador3 = await Aportante.findByIdAndUpdate(id, { estado:1});

    res.json({
      trabajador3
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutDesactivar: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador3 = await Aportante.findByIdAndUpdate(id, { estado:2 });

    res.json({
      trabajador3
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutFin: async (req, res) => {
    try {

    const { id } = req.params;
    const trabajador3 = await Aportante.findByIdAndUpdate(id, { estado:3 });

    res.json({
      trabajador3
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorDelete: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador3 = await Aportante.findByIdAndDelete(id);
    res.json({
      trabajador3
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  }
}

export { aportante }
