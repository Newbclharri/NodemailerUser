//////////////////////
// Import Dependencies
//////////////////////
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const { mainModule } = require("process");

const EMAIL = process.env.EMAIL;
const EMAIL2 = process.env.EMAIL2;
const PASS = process.env.PASS;

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

router.post("/contact", (req, res)=>{ 
    console.log(req.body)
    const contents = req.body
    if(!contents){
        return res.status(400).send({status: "failed"});
    }
    res.status(200).send({
        status: "success",
        contents: contents
    })   
    // await sendEmail()
    //     .then(response => res.send(response.message))
    //     .catch(err => res.status(500).send(err.message))    
});


//////////////////
// Nodemailer fxns
//////////////////
function sendEmail(){
    return new Promise((resolve, reject)=>{
        const transporter = nodemailer.createTransport({
            host: "gmail",
            auth: {
                user: EMAIL,
                pass: PASS
            }
        });
        const info = {
            from: EMAIL, // sender address
            to: EMAIL, EMAIL2, // list of receivers
            subject: "My Portfolio Inquiry",
            text: "content"

        };
        transporter.sendMail(info,(err, emailInfo)=>{
            if(err){
                console.log("Error: ", err);
                return reject({message: 'An error occured.'}); //returned from native catch method if there's an during Promise process
            }
            return resolve({message:'Email sent successfully'}); //returned from native then method if Promise is successful    
        });

    });            
    
}
module.exports = router;