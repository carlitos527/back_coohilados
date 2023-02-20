import mongoose from 'mongoose';

const ConsecutivoSchema= new mongoose.Schema({
    
    consecutivoTrabajador:{
        type: Number,
        required: true,
        default:1

    },
    consecutivoTemporal:{ 
        type: Number,
        required: true,
        defaul:1
    },
    consecutivoDirecto:{
        type: Number,
        required: true,
        defaul:1
    },
    
})

export default mongoose.model("Consecutivo",ConsecutivoSchema)
