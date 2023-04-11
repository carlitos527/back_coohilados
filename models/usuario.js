import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    area:    {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default:"Cliente"
    },
    foto: {
        type: String,
        default:""
    },
    borrarFoto: {
        type: String,
        default:""
    },
    estado: {
        type: Number,//0 inactivo  1:activo   2:vacaciones
        default: 1 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

export default mongoose.model('Usuario', UsuarioSchema)