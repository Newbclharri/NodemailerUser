///////////////////////
// Import Dependecies
//////////////////////
require("dotenv").config();
const express = require("express");


//////////////////////
// Server Application
//////////////////////
const app = express();
const PORT = process.env.PORT;

//////////////
// app listener
//////////////
app.listen(PORT, ()=> console.log(`Email servicing on PORT ${PORT}`));
