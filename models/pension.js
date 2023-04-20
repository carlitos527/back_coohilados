import mongoose from "mongoose";

const pensionSchema = new mongoose.Schema({
    hombre:{
        type:Number
    },
    mujer:{
        type:Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Pension',pensionSchema)