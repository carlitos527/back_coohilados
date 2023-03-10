import mongoose from 'mongoose';

const AyudaTemporalSchema = new mongoose.Schema({


    tipoDocumento: {
        type: String,
        required: true
    },
    documento: {
        type: Number,
        required: true,
        unique: true,
        default: "Natural"
    },

    barrio: {
        type: String,
        required: true
    },
    
    nombre: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    tipoContrato: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    
    fechaInicio: {
        type: Date,
        maxLength: 14,

    },

    fechaFin: {
        type: Date,
        maxLength: 14,

    },

    tiempoLaborado: {
        type: Number,
        maxLength: 10,
        default:0
    },

    salario: {
        type: Number, 
        required: true
        },

    areaTrabajo: {
        type: mongoose.Schema.ObjectId,
        ref: "areaTrabajo",
        maxLength: 20,
        
    },
    rol: {
        type: String,
        default: "trabajador"
    },
    
    estado: {
        type: Number,
        default: 1 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    //0 inactivo  1:activo   2:vacaciones 
})

export default mongoose.model('Temporal', AyudaTemporalSchema)
 