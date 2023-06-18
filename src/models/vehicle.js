// import the require modules
const mongoose = require("mongoose");
const {Schema, model} = mongoose;

//Creating Vehicle Schema
const VehicleSchema = new Schema({
    type: {type:String, required:true},
    model: {type:String, required:true},
    wheels: {type:Number, required:true},
    isAvailable: {type:Boolean, required:true}
})

const VehiclesModel = model("vehicle", VehicleSchema)
module.exports = VehiclesModel;