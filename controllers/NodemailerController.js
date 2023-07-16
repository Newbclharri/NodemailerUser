//////////////////////
// Import Dependencies
//////////////////////
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const EMAIL = process.env.EMAIL;
const EMAIL2 = process.env.EMAIL2;
const PASS = process.env.PASS;
const PASS3 = process.env.PASS3;

/////////////////
// Create Router Object
////////////////
const router = express.Router();

//////////
// Routes
//////////

//root:
router.get("/", (req, res)=>{
    const options = {
        root: path.join(__dirname, "../views"),
        dotfiles: "deny",
        headers: {
            "x-timestamp": Date.now(),
            "x-sent": true
        }
    }
    const fileName = "index.html";

    res.sendFile(fileName, options, (err)=>{
        if(err){
            console.log(err);
        } else{
            console.log("Sent ", fileName);
        }
    })
});

//contact
router.get("/contact", (req, res)=>{
    const options = {
        root: path.join(__dirname, "../views"),
        dotfiles: "deny",
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    const fileName = "contact.html";

    res.sendFile(fileName, options, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Sent ", fileName);
        }
    })
});

router.post("/contact", async (req, res)=>{ 
    console.log("req.body: ", req.body)
    const contents = req.body
    if(!contents){
        return res.status(400).send({status: "failed"});
    }  
    await sendEmail(contents);
});


//////////////////
// Nodemailer fxns
//////////////////
function sendEmail(obj){
        const transporter = nodemailer.createTransport({
            host: "gmail",
            auth: {
                user: "clharri23@gmail.com",
                pass: PASS3
            }
        });
        const info = {
            from: "clharri23@gmail.com", // sender address
            to: "contactharrisc2@gmail.com", // list of receivers
            subject: `Message from ${obj.nameUser} <${obj.email}>: ${obj.subject}`,
            text: obj.message

        };
        transporter.sendMail(info,(err, emailInfo)=>{
            if(err){
                console.log("Error: ", err);
            }else{
                console.log('Email sent ' + emailInfo.response);
            }
            
        });    
}
module.exports = router;