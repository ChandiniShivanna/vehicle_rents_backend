const mongoose = require('mongoose');
const {Schema, model, ObjectId} = mongoose;

const BookingSchema = new Schema({
  name:{type:String, required:true},
  type: { type: String, required: true },
  model: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  vehicleId: { type: ObjectId, ref: 'vehicle', required: true },
});

const BookingModel = model('Booking', BookingSchema);

module.exports = BookingModel;