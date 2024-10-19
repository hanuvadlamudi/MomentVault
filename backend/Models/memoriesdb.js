import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MemoriesSchema = new Schema({
    memory:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    person:{
        type:String,
        required:true
    },
    picture:{
        type : String
    },
    description:{
        type:String
    },createdAt:{
        type:Date,
        default : new Date()
    },updatedAt:{
        type:Date,
        default: new Date()
    }
})


const MemoriesModel = mongoose.model("memorie",MemoriesSchema);

export default MemoriesModel;