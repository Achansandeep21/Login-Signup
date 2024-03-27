const express=require("express");
const router=express.Router();
const bcrypt= require("bcrypt");
const cdb=require("./connectToDB");

let upload=cdb.upload;
let connection= cdb.connection;


router.post("/signUp",upload.single("profilePick"),async(req,res)=>{
    console.log(req.body)
    console.log(req.file);//used to print all file properties
    let profilePickPath=`${req.file.destination}/${req.file.filename}`;
    let hashPassword=await bcrypt.hash(req.body.password,10);
    let query=`insert into users(name,MobileNo,age,EmailId,Password,ProfilePick) values('${req.body.name}','${req.body.mobileNo}',${req.body.age},'${req.body.emailId}','${hashPassword}','${profilePickPath}')`;
    
    console.log(query);
    connection.query(query,(err,result)=>{
        if(err){
            res.json(err);
        }
        else
        {
            res.json({status:"Success",msg:"Account Created Successfully"});
        }
    })
    console.log(req.body);
    
})


router.patch("/updateProfile",upload.single("profilePick"),(req,res)=>{
    let profilePickPath=`${req.file.destination}/${req.file.filename}`;

    let query=`update users set name='${req.body.name}',MobileNo='${req.body.mobileNo}',age=${req.body.age},EmailId='${req.body.emailId}',Password='${req.body.password}',ProfilePick='${profilePickPath}' where Id=${req.body.id}`;
    console.log(query)
    connection.query(query,(err,results)=>{
        if(err){
            res.json(err)   
        }
        else{
            res.json({status:"Success",msg:"updated profile"})
        }
    })


})


router.delete("/deleteAccount",(req,res)=>{
    let query=`delete from users where Id=${req.query.id}`;
    console.log(query);
    connection.query(query,(err,results)=>{
        if(err){
            res.json(err)   
        }
        else{
            res.json({status:"Success",msg:"Delete Accounted is success"})
        }
    })

    console.log("end of delete");

})



module.exports=router;