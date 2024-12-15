const cors=require("cors");
const express=require("express");
const userServices=require("./routes/User");
const loginServices=require("./routes/login");

const app=express();
app.use(cors());

app.use("/",userServices);
app.use("/validateLogin",loginServices);



app.use(express.json());
app.use('/uploads',express.static('uploads'));


let authenicateToken=(req,res,next)=>{
    console.log("iam inside the authenicatetoken");
    console.log(req.headers.authorisation);
    next();
}
app.use(authenicateToken);

app.listen(1212,()=>{
console.log("listening to port number 1212")
})





