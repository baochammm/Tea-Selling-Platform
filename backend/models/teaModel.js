import mongoose from 'mongoose';
const teaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    countInStock:{
        type: Number,
        required: false
    },
    expiryDate:{
        type: Date,
        required: false
    }
})
const teaModel = mongoose.models.tea || mongoose.model("tea", teaSchema);
export default teaModel;