const mysql=require("mysql");
const multer=require("multer");
const dotenv=require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() +"_"+ file.originalname)
    }
  })
  const upload = multer({ storage: storage })

  let connection=mysql.createConnection(
    {
        //this data is coming from .env file
        host:process.env.host,
        user:process.env.user,
        password:process.env.password,
        port:process.env.port,
        database:process.env.database
    }
)
connection.connect((err)=>{
    if(err){
        console.log("Unable to Connect To DB")
    }else{
        console.log("Connected successfully")
    }
})

module.exports={connection, upload}