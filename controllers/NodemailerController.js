//////////////////////
// Import Dependencies
//////////////////////
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");
const defaultProvider = require("@aws-sdk/credential-provider-node");
const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1",
    defaultProvider
});
// const credentials = new aws.SharedIniFileCredentials({profile: 'ses'})
// aws.config.credentials = credentials;
const path = require("path");
const EMAIL = process.env.EMAIL;
const EMAIL2 = process.env.EMAIL2;
const EMAIL3 = process.env.EMAIL3;
const EMAILJ = process.env.EMAILJ;
const EMAILJ2 = process.env.EMAILJ2;
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
            console.log("Sent: ", fileName);
        }
    })
});

router.post("/contact", (req, res)=>{ 
    const contents = req.body;
    console.log(contents.message)
    sendEmail(contents)
        .then(()=>{res.send("success")})
        .catch(err => res.send(err.message));
    if(!contents){
        return res.status(400).send({status: "failed"});
    }  
});


//////////////////
// Nodemailer fxns
//////////////////
function sendEmail(obj){
    console.log(typeof(obj))
    return new Promise((resolve, reject)=>{
        const transporter = nodemailer.createTransport({
            SES: {ses,aws},
        });
        const mailConfigs = {
            from: EMAIL, // sender address
            to: EMAILJ, // list of receivers
            subject: String(obj.subject),
            text: String(obj.message)

        };
        transporter.sendMail(mailConfigs,(err, info)=>{
            if(err){
                console.log("Error: ", err);
                reject({message: "An error occurred"});
            }else{
                console.log('Email sent ' + info.response);
                resolve({message: "email sent successfuly"});
            }
            
        });  
        
    });
        
}
module.exports = router;