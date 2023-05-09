import mongoose from "mongoose";

const AportanteSchema = new mongoose.Schema({
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
    
    sexo: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
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
        default: "Asociado"
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

export default mongoose.model("Aportante", AportanteSchema );
