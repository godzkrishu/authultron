const express=require("express")
const mongoose=require("mongoose")
const cors = require('cors');
const authRouter=require("./routes/auth")
//const adminRouter = require("./routes/admin");
//mongodb pass cfdEyjq22dAzD7cA and id sandhya756507
//string= mongodb+srv://sandhya756507:cfdEyjq22dAzD7cA@authproject.g9hzw.mongodb.net/
require('dotenv').config();

/// mongo db connection 
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl).then(()=>{
console.log("connection succesfull")
}).catch((e)=>{
    console.log(e);
})

 app=express();
app.use(cors());// for allow to connenct from diffrent locations id
app.use(express.json());// to accept the json data  and decode

app.use(authRouter);
//app.use(adminRouter);
const port = process.env.PORT || 4000;

app.listen(port,(req,res)=>
{
console.log("hello  server is at 4000");
});