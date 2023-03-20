import Trabajador from '../models/trabajadorDirecto.js'
import Setup from '../models/setup.js'
import helpersBitacora from '../helpers/bitacora.js';


const directo = {
    Trabajador2Post: async (req, res) => {

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
                fechaFin,
                rol,
                estado } = req.body


            const consecutivo = await Setup.findOne();
            let conse = "";
            if (consecutivo.consecutivoDirecto.toString().length == 1) {
                conse = `000${consecutivo.consecutivoDirecto}`;
            } else if (consecutivo.consecutivoDirecto.toString().length == 2) {
                conse = `00${consecutivo.consecutivoDirecto}`;
            } else if (consecutivo.consecutivoDirecto.toString().length == 3) {
                conse = `0${consecutivo.consecutivoDirecto}`;
            } else {
                conse = consecutivo.consecutivoDirecto;
            }

            const d = new Date();
            let year = d.getFullYear();
            let cotiNumero = "".concat(conse, "-", year, "-" + "V1");

            console.log("conca:  " + cotiNumero);

            let consecutivodirecto = consecutivo.consecutivoDirecto + 1;
            const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
                consecutivoDirecto: consecutivodirecto
            });

            if (!guardar) {
                return res.status(400)
                    .json({
                        msg: "No se puede actualizar la información del trabajador"
                    });
            };

            let fechaI = new Date(fechaInicio);
            let fechaF = new Date(fechaFin);
            let fecha = ((fechaF - fechaI) / (24 * 60 * 60 * 1000))


            const trabajador2 = new Trabajador({
                
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
                fechaFin,
                tiempoLaborado: fecha,
                rol,
                estado
            });

            if (!trabajador2) {
                return res
                    .status(400)
                    .json({ msg: "No se puedo registrar el trabajador directo" });
            }

            trabajador2.save();
            res.json({ trabajador2 });
            const usuario = req.usuario
            let idPersona = usuario._id;
            let mensaje = `El trabajador Directo fue registrada exitosamente, por ${usuario.nombre}`
            helpersBitacora.guardarBitacora(idPersona, mensaje)

        } catch (error) {
            return res.status(500).json({ msg: "el trabajador Directo no pudo ser ingresado, hable con web master carlitos" })

        }
    },
    trabajadorGet: async (req, res) => {
        const trabajador2 = await Trabajador.find().populate({ path: 'areaTrabajo' })
        res.json({
            trabajador2
        })
    },
    trabajadorGetId: async (req, res) => {
        const { id } = req.params
        const trabajador2 = await Trabajador.findById(id)

        res.json({
            trabajador2
        })
    },
    trabajadorGetIdent: async (req, res) => {

        const { documento } = req.params
        const trabajador2 = await Trabajador.find({ documento })
            .populate("documento", ["nombre"])
        console.log(documento)
        res.json({
            trabajador2
        })
        console.log(trabajador2)
    },
    trabajadorPut: async (req, res) => {
        const { id } = req.params;
        const { _id, createAdt, estado, ...resto } = req.body;
        const trabajador2 = await Trabajador.findByIdAndUpdate(id, resto);

        res.json({
            trabajador2
        })
    },

    trabajadorPutActiv: async (req, res) => {
        const { id } = req.params;
        const trabajador = await Trabajador.findByIdAndUpdate(id, { estado: 1 });

        res.json({
            trabajador
        })
    },
    trabajadorPutDesactivar: async (req, res) => {
        const { id } = req.params;
        const trabajador = await Trabajador.findByIdAndUpdate(id, { estado: 2 });

        res.json({
            trabajador
        })
    },
    trabajadorPutVacaciones: async (req, res) => {
        const { id } = req.params;
        const trabajador2 = await Trabajador.findByIdAndUpdate(id, { estado: 3 });

        res.json({
            trabajador2
        })
    },

    trabajadorDelete: async (req, res) => {
        const { id } = req.params;
        const trabajador2 = await Trabajador.findByIdAndDelete(id);
        res.json({
            trabajador2
        })
    }

}


export default directo
