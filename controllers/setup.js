import Setup from "../models/setup.js"

const setup = {
    setupPost: async (req, res) => {
        try {
            const { consecutivoTrabador, consecutivoTemporal, consecutivoDirecto } = req.body
            const setcod = new Setup({ consecutivoTrabador, consecutivoTemporal, consecutivoDirecto })
            setcod.save()
            res.json({
                setcod
            })
        } catch (error) {
            res.status(500).json({ msg: "Habla con el web master" })  
        } 

    },
    setupGet: async (req, res) => {
        try {
            const setcod = await Setup.find()
            res.json({
                setcod
            })
        } catch (error) {
            res.status(500).json({ msg: "Hable con el web master carlitos" })
        }

    },
    setupGetId: async (req, res) => {
        try {
            const { id } = req.params
            const setcod = await Setup.findById(id)

            res.json({
                setcod
            })
        } catch (error) {
            res.status(500).json({ msg: "Habla con el web master carlitos" })
        }
    },
    setupPut: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, createAdt, ...resto } = req.body;
            const setcod = await Setup.findByIdAndUpdate(id, resto);

            res.json({
                setcod
            })
        } catch (error) {
            res.status(500).json({ msg: "Habla con el web master" })

        }
    },
}

export default setup