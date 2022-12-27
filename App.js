const express = require("express");
const app = express();
mongoose = require("mongoose");
const cors=require("cors");
app.use(express.json());
const bcrypt = require("bcryptjs");
app.use(cors());
const jwt=require("jsonwebtoken");
const JWT_SECRET="sdfghgfdrytyeusjnxcbvgfudncb";
const mongoUrl="mongodb+srv://vishnu:%40Vardhan27@cluster0.rjqjc5h.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
}).then(()=>{console.log("connected to db")})
.catch(e=>console.log(e))

require("./userDetails");
const User =mongoose.model("UserInfo");
app.post("/register",async(req,res)=>{
const {uname,uemail,unumber,upassword} = req.body;
const encryptedPassword=await bcrypt.hash(upassword,10);
    try{
const oldUser = await User.findOne({uemail})
if(oldUser){
    return res.json({error:"User Exist"});
}
await User.create({
    uname,
    uemail,
    unumber,
    upassword:encryptedPassword,
});
res.send({status:"OK"});
}catch(error){
    res.send(error);
}

});

app.post("/login-user",async(req,res)=>{
    const {uemail,upassword}= req.body;
    const user = await User.findOne({uemail});
    if(!user){
        return res.json({error:"User Not Found"});
    }
    if (await bcrypt.compare(upassword,user.upassword)){
        const token=jwt.sign({uemail: user.uemail},JWT_SECRET);

    if (res.status(201)){
        return res.json({status:"ok",data:token});
            }
    else{
       return res.json({error:"error"});
    }
    }
    return res.json({error:"password not matching with our records"});
})

app.post("/userData",async(req,res)=>{
    const{token}= req.body;
    try{
const user =jwt.verify(token,JWT_SECRET);
const uemail=user.uemail;
User.findOne({uemail:uemail})
.then((data)=>{
    res.send({status:"ok",data:data});
}).catch((error)=>{
    res.send({status:"error",data:error});
});

    }
    catch{

    }
})

app.listen(5000,()=>{
    console.log('server is up and running');
})