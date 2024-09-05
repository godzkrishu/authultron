const mongoose= require("mongoose")
const userSchema= mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true,//"   krishna " will trimed to "krishna"
    },
    email:
    {
        required:true,
        type:String,
        trim:true,
        validate:{
            validator:(value)=>{
                const re = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                return value.match(re);
            },
           message: "Enter a valid email address"
        }
    },
    password:
    {
        required:true,
        type:String,
        validator:{
            validator:(value)=>
            {
                return value.lengt >= 6;
            },
            message:"enter password atleast 6char long",

        }
    },

//        type:
//        {
//            type:String,
//            default:'user'
//        }

});
const User = mongoose.model('User', userSchema);

module.exports = User;