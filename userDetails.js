const mongoose= require("mongoose");
const UserDetailsScehma= new mongoose.Schema(
   { 
    uname: String,
    uemail: {type:String, unique:true},
    unumber: String,
    upassword:String,
},
   {
    collection:"UserInfo",  
    }
);
mongoose.model("UserInfo", UserDetailsScehma);