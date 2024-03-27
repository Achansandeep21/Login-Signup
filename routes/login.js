const express=require("express");
const router=express.Router()
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
const cdb=require("./connectToDB");

let upload=cdb.upload;

let connection= cdb.connection;
router.post("/validatedLogin",upload.none(),(req,res)=>{
    // console.log(req.body);
    let query=`select * from users where EmailId='${req.body.email}'`;
    connection.query(query,async(err,result)=>{
        if(err){
            res.json(err)
        }
        else{if(result.length>0)
            {
     
            bcrypt.compare(req.body.password,result[0]["Password"],(err,passwordResult)=>{
                if(err){
                    res.json({status:"error",data:err})
                }
                else{
                    if(passwordResult == true)
                    {
                        let userDetails=result[0];
                        delete userDetails.Password;
                        let token= jwt.sign({
                            email:req.body.email,
                            password:req.body.password
                        },"BRN");
                        userDetails.token=token;//adding the token to the user detalis
                       userDetails.isLoggedIn=true;
                        res.json({status:"Success",data:userDetails})
                    }
                    
                else{
                    res.json({status:"error",msg:"password wrong"})
                }
                }
            })

           
        }
        else{
            res.json({status:"error",msg:"User does not exist"})
        }
            
        }

    })
  
})

router.post("/valiateToken",upload.none(),(req,res)=>{
    console.log('recieved token');
    console.log(req.body.token);
    jwt.verify(req.body.token,"BRN",(error,decodedToken)=>{
    
        if(error){
            console.log({status:"error", msg:"Invalid token"})
        }
        else{
            let query=`select * from users where EmailId='${decodedToken.email}'`;
         connection.query(query,(err,result)=>{
        if(err){
            res.json(err)
        }
        else{if(result.length>0)
            {
                bcrypt.compare(decodedToken.password,result[0]["Password"],(err,passwordResult)=>{
                    if(err){
                        res.json({status:"error",data:err})
                    }
                    else{
                        if(passwordResult == true)
                        {
                            let userDetails=result[0];
                            delete userDetails.Password;
                            //creating the token in the form of object
                            let token= jwt.sign({
                                email:req.body.email,
                                password:req.body.password
                            },"BRN");//here we use BRN because its the key to decode the token
                            userDetails.token=token;//adding the token to the user detalis
                            userDetails.isLoggedIn=true;

                            res.json({status:"Success",data:userDetails})
                        }
                        
                    else{
                        res.json({status:"error",msg:"password wrong"})
                    }
                    }
                })
    
        }
        else{
            res.json({status:"error",msg:"User does not exist"})
        }
            
        }

    })

        }
    });
    

})

module.exports=router;