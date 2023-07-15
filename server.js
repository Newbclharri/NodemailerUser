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
const PORT = process.env.PORT || 5000;

/////////////
//Middleware
/////////////
app.use(morgan("dev")); //log requests to server
app.use(cors());
app.use(methodOverride("__method")); //overide request methods for form submissions
app.use(express.urlencoded({extended: true})) //parse html form bodies into req.body
app.use(express.json()); //needed to receive data in JSON format from frontend client
app.use("/static", express.static("static")); //serve files via express static route
app.use(NodemailerRouter);

//////////////
// app listener
//////////////
app.listen(PORT, ()=> console.log(`Email servicing on PORT ${PORT}`));
