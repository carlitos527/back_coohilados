import Trabajador from '../models/trabajadorDirecto.js'

const directo = {
    Trabajador2Post: async (req, res) => {
        try {
            const {
                nombre,
                tipo,
                pension,
                rh,
                arl,
                eps,
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
                anotacion,
                rol,
                estado } = req.body

            /* let fechaI = new Date(fechaInicio);
            let fechaF = new Date(fechaFin);
            let fecha = ((fechaF - fechaI) / (24 * 60 * 60 * 1000)) */

            const trabajador2 = new Trabajador({
                nombre,
                tipo,
                pension,
                rh,
                arl,
                eps,
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
                anotacion,
                rol,
                estado
            });

            if (!trabajador2) {
                return res.status(400).json({ msg: "No se puedo registrar el trabajador directo" });
            }
            trabajador2.save();
            res.json({ trabajador2 });

        } catch (error) {
            return res.status(500).json({ msg: "el trabajador Directo no pudo ser ingresado, hable con web master carlitos" })

        }
    },
    trabajador2ActivoGet: async (req, res) => {
        try {

            const trabajador2 = await Trabajador.find({ estado: 1 })
                .populate({ path: 'areaTrabajo' });
            if (!trabajador2) { return res.status(400).json({ msj: "No se encontraron trabajadores DIRECTO activos" }) }
            res.json({ trabajador2 })

        } catch (error) {
            return res.status(500).json({ msj: "hable con el web master carlitox" })

        }

    },
    trabajadorGet: async (req, res) => {
        try {
            const trabajador2 = await Trabajador.find().populate({ path: 'areaTrabajo' })
            res.json({
                trabajador2
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }

    },
    trabajadorGetId: async (req, res) => {
        try {
            const { id } = req.params
            const trabajador2 = await Trabajador.findById(id)

            res.json({
                trabajador2
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }

    },
    trabajadorGetIdent: async (req, res) => {
        try {

            const { documento } = req.params
            const trabajador2 = await Trabajador.find({ documento })
                .populate("documento", ["nombre"])
            console.log(documento)
            res.json({
                trabajador2
            })
            console.log(trabajador2)
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    trabajadorPut: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, createAdt, estado, ...resto } = req.body;
            const trabajador2 = await Trabajador.findByIdAndUpdate(id, resto);

            res.json({
                trabajador2
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    trabajadorPutActiv: async (req, res) => {
        try {
            const { id } = req.params;
            const trabajador = await Trabajador.findByIdAndUpdate(id, { estado: 1 });

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
            const trabajador = await Trabajador.findByIdAndUpdate(id, { estado: 2 });

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
            const trabajador2 = await Trabajador.findByIdAndUpdate(id, { estado: 3 });

            res.json({
                trabajador2
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    trabajadorDelete: async (req, res) => {
        try {
            const { id } = req.params;
            const trabajador2 = await Trabajador.findByIdAndDelete(id);
            res.json({
                trabajador2
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    }
}


export default directo
