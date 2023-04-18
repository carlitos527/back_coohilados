import mongoose from "mongoose";

const TrabajadorDirectoShema = new mongoose.Schema({
    tipoDocumento: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
    },
    pension: {
        type: String,
        required: true,
    },
    rh: {
        type: String,
        required: true,
    },
    arl: {
        type: String,
        required: true,
    },
    eps: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    tipoDocumento: {
        type: String,
        required: true
    },
    documento: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    ciudad: {
        type: mongoose.Schema.ObjectId,
        ref: "Ciudad",
        required: true
    },
    barrio: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        maxLength: 14,
        required: true
    },
    tipoContrato: {
        type: String,
        required: true
    },
    areaTrabajo: {
        type: mongoose.Schema.ObjectId,
        ref: "areaTrabajo",
        maxLength: 20,
        required: true
    },
    salario: {
        type: Number,
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
    rol: {
        type: String,
        default: "trabajador"
    },
    estado: {
        type: Number,
        default: 1
    },
    anotacion: [
        {
            fecha: {
                type: Date,
                required: true
            },

            descripcion:{
                type:String,
                required:true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    //0 inactivo  1:activo   2:vacaciones 
})


export default mongoose.model("TrabajadorDirecto", TrabajadorDirectoShema);