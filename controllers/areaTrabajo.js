import AreaTrabajo from '../models/areaTrabajo.js'

const areaTrabajo = { 
    areaPost: async (req, res) => {
        const { nombre } = req.body

        const lugar = new AreaTrabajo({ nombre })
        lugar.save()
        res.json({ lugar })


    },

    areaGet: async (req, res) => {
        const lugar = await AreaTrabajo.find()
        res.json({ lugar })
    },


    areaGetId: async (req, res) => {
        const { id } = req.params
        const lugar = await AreaTrabajo.findById(id)
            .populate("id", ["nombre"])
            console.log(id)
        res.json({ lugar }) 
    }, 


    areaPut: async (req, res) => {
        const { id } = req.params;
        const { _id, createAdt, estado, ...resto } = req.body;
        const lugar = await Usuario.findByIdAndUpdate(id, resto);

        res.json({ lugar })
    },


    areaDelete: async (req, res) => {
        const { id } = req.params;
        const areaTrabajo = await AreaTrabajo.findByIdAndDelete(id);
        res.json({
            areaTrabajo
        })  
    }

}

export default areaTrabajo