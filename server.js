//ESTRUCTURA BASICA PARA LEVANTAR SERVIDOR.
const express = require("express");
const cors = require("cors");
require("dotenv").config()
require("./config/database")
const Routes=require("./routes/routes")

const app = express();
  
const PORT = process.env.PORT || 4000;  //Puerto donde se inicializa nuestro servidor, 4000 porque en el 3000 me levanta react, DEFINIMOS EL PUERTO CUANDO ES EN AMBITO LOCAL
 
app.set("port",PORT);
  
//middelwares
app.use(cors())
app.use(express.json())
app.use("/api", Routes)

 app.get("/",(req,res)=>{
     res.send(process.env.TEXT)
 })
    
app.listen(PORT,() => {
    console.log("EL SERVIDOR ESTA  CORRIENDO EN EL PUERTO: " + app.get("port")) 
}) 