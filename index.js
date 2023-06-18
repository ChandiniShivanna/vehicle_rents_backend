// import the require modules
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const bookingRouter = require("./src/Routers/bookingRouter")
const cors = require("cors")

dotenv.config()

//db connection 
const main = require("./src/connections/mongoose-connect")
main()

app.use(cors())
//midleware usage

app.use("/rental/v1", bookingRouter)


const port = process.env.PORT || 3001;
app.listen(port, (err)=>{
    if(err) console.log(err)
    else console.log("Server is up at", port)
})