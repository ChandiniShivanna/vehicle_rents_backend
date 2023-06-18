const express = require("express")
const router = express.Router()
const VehicleModel = require("../models/vehicle");
const BookingModel = require("../models/booking")

router.use(express.json())
router.use(express.urlencoded())

//retrieving data
router.get('/vehicles', async (req, res) => {
  try{
    let vehicle = await VehicleModel.find();
    if (!vehicle) {
      res.status(404).json({ message: 'No available vehicle found for this type, model, and date range.' });
    } else {
      console.log(vehicle)
      return res.json(vehicle);
    }
  }catch(e){
    console.log(e)
  }
    
  });

//creating data here
  router.post("/vehicles", async(req, res) => {
    try {
      const  {vehicleId,startDate, endDate, model,firstName, lastName, type} = req.body
      let start = new Date(startDate),
      end = new Date(endDate)
      if(start > end){
        res.json({
          status:"Failed",
          message:"start is greater then end date"
        })
      }
//will check if vehicle is already booked in that date range--------------------
        const checkExistingBookings = await BookingModel.findOne({    
            vehicleId:vehicleId,
            'endDate': { $gte:startDate },
            'startDate': { $lte:endDate },
        });
        if (checkExistingBookings) {
            res.status(409).json({
                status: "Failed",
                message: "Vehicle already booked for this date range"
            });
            return;
        }

        const data = {
            name: `${firstName} ${lastName}`,
            type:type,
            model: model,
            startDate:startDate,
            endDate:endDate,
            vehicleId:vehicleId
           
        };

        const vehicledata = await BookingModel.create(data);  
        res.status(201).json({
            status: "success",
            vehicledata
        })
    } catch (e) {
        res.status(501).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;