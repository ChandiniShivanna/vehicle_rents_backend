const mongoose = require("mongoose")

const seed  = require("../Seeding/seed")
function main(){
    try{
        mongoose.connect(process.env.DATABASE_URL || 3001,{ useNewUrlParser: true } )
        console.log("Database connected")
        seed()  
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = main;