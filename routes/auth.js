const express = require("express")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authmiddleware')
authRouter = express.Router();
authRouter.post("/api/signup", async (req, res) => {

    try {
        //req.body-Map type -{name,email,passwprd,address,type}
        //receive data from user
        console.log("signup backend 1");
        const { name, email, password } = req.body;
        ///validate
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ msg: "User email Already exist" });
        }
         console.log("signup  backend not user found");
        // if email not exist
        const hashedPassword = await bcrypt.hash(password, 3);
        console.log(hashedPassword)
        //send to mongodb
        var user = new User(
            {
                name,
                email,
                password: hashedPassword
                /// same oder as above received
            },)
        user = await user.save();//save to mongodb server
        console.log(user)
        res.json(user);

    } catch (er) {
        res.status(500).json({ error: er.message })
    };


});
////////validate stamp
authRouter.post("/validateStamp", async (req, res) => {

    try {

        const stamp = req.header('stamp');
        if (!stamp) return res.json(false);//if stamp is null
        const isValid = jwt.verify(stamp, 'secretkey');
        if (!isValid) return res.json(false);//unauthorised stamp
        const user = await User.findById(isValid.id);//search in data base
        if (!user) return res.json(false);//user not found
       //else
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



///////////signin
authRouter.post("/api/signin", async (req, res) => {
    //jab authcontroller se data post hoga to yha ayega
     console.log("signin backend 1");
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)//if user email doesnot exist
        {
            return res.status(400).json({ msg: "User doesn't exist" });
        }
         console.log("signin backend user found");
        const isMatching = await bcrypt.compare(password, user.password);
        if (!isMatching) {
            return res.status(400).json({ msg: "Incorrect Password" });
        }
        //JSONWEBTOKEN
        ///TOKEN CREATION
        //TOKEN TRANSMISSION
        //TOKEN USAGE
        //TOKEN VERIFICATION
        //ACCESS CONTROL
        console.log("user found");
        console.log(user);
        const stamp = jwt.sign({ id: user._id, }, "secretkey");// genrate uique signrature
        res.json({ stamp, ...user._doc });//add stamp to user doc
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//first come here and then use the above funtion

authRouter.get('/',auth,async(req,res)=>{//auth middleware perform stamp validation
    const user = await User.findById(req.user)//that was send by the auth funtion in authmiddleware
    res.json({...user._doc, stamp:req.stamp})//send to front end
});
module.exports = authRouter;