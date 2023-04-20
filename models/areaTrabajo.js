import mongoose from 'mongoose';

const AreaTrabajoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('areaTrabajo', AreaTrabajoSchema)