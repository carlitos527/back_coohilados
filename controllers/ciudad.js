
import Ciudades from '../models/ciudad.js'

const infoCiudad = {
    ciudadPost: async (req, res) => {
        const { CodDepartamento, Departamento, CodCiudad, Ciudad } = req.body
        
            const city = new Ciudades({ CodDepartamento, Departamento, CodCiudad, Ciudad })
            city.save()
            res.json({ city })

        
    },
    departamentoGet: async (req, res) => {
        try {
            const departamentos = await Ciudades.find().distinct('Departamento')
            if (!departamentos) {
                return res.status(400).json({
                    msg: "Departamento no encontrado"
                })
            }
            res.json({
                departamentos
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }

    },
    ciudadDepartamento: async (req, res) => {
        const { Departamento} = req.params
        console.log("hola"+Departamento)
        try {
            const city = await Ciudades.find({Departamento}
            )
            

            if (!city) {
                return res.status(400).json({
                    msg: "Departamento no encontrado"
                })
            }
            res.json({
                city
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
    ciudadGet: async (req, res) => {
        try {
            const ciu = await Ciudades.find()
            res.json({
                ciu
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" });
        }
    },
    ciudadGetId: async (req, res) => {
        const { id } = req.params
        try {
            const idCity = await Ciudades.findById(id)
            if (!idCity) {
                return res.status(400).json({
                    msg: "Departamento no encontrado"
                })
            }
            res.json({
                idCity
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" });
        }
    },
    ciudadNombreGet: async (req, res) => {
        const { Ciudad } = req.params;
        try {
            console.log(Ciudad);
            const town = await Ciudades.find({ Ciudad })
            res.json({
                town,
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" });
        }
    },
    ciudadCodDeGet: async (req, res) => {
        const { CodDepartamento } = req.params;
        try {
            const codDep = await Ciudades.find({ CodDepartamento })
                .populate("CodDepartamento", ["Departamento"])
            res.json({
                codDep,
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" });
        }
    },
    ciudadDepGet: async (req, res) => {
        const { Departamento } = req.params;

        const nomDep = await Ciudades.find({ Departamento })
        res.json({
            nomDep,
        })

    },
    ciudadCodCiGet: async (req, res) => {
        const { CodCiudad } = req.params;

        const codCiu = await Ciudades.find({ CodCiudad })
        res.json({
            codCiu,
        })

    },
    ciudadPut: async (req, res) => {
        const { id } = req.params;
        try {
            const { _id, createAdt, ...resto } = req.body;
            const cityPut = await Ciudades.findByIdAndUpdate(id, resto);
            if (!cityPut) {
                return res
                    .status(400)
                    .json({ msg: " No se puedo registrar la ciudad" });
            }
            res.json({
                cityPut
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" });
        }

    },
    ciudadDelete: async (req, res) => {
        const { id } = req.params;
        try {
            const city = await Ciudades.findByIdAndDelete(id);
            res.json({
                city
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" });
        }
    }

}



export { infoCiudad }