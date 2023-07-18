///////////////////////
// Import Dependecies
//////////////////////
require("dotenv").config();
const express = require("express");
const NodemailerRouter = require("./controllers/NodemailerController.js");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");


//////////////////////
// Server Application
//////////////////////
const app = express();
const PORT = process.env.PORT;

/////////////
//Middleware
/////////////
app.use(cors());
app.use("/static", express.static("static")); //serve files via express static route
app.use(express.urlencoded({extended: true})) //parse html form bodies into req.body
app.use(express.json()); //needed to receive data in JSON format from frontend client
//app.use(methodOverride("__method")); //overide request methods for form submissions
app.use(morgan("dev")); //log requests to server
app.use(NodemailerRouter);

//////////////
// app listener
//////////////
app.listen(PORT, ()=> console.log(`Email servicing on PORT ${PORT}`));
