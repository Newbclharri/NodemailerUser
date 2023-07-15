console.log("connected");
const baseUrl = "http://localhost:3000/"
const form = document.querySelector("form");
const nameUser = document.getElementById("name-field");
const email = document.querySelector("#user-email");
const subject = document.querySelector("#subject-email");
const message = document.querySelector("#message-email");
const button = document.getElementById("send");

const emailFields = {
    nameUser: nameUser,
    email: email,
    subject: subject,
    message: message

}

console.log(emailFields)

form.addEventListener("submit", (e)=>{
    sendDataXhrPromise(e)
        .then(console.log("data sent"))
        .catch(err=>{console.log(err)})
});

async function sendDataAjax(e){
    e.preventDefault(); //prevents page reload
    console.log("submitted :)");
    console.log(input.value)
    if(!input.value){return};
    await fetch(baseUrl + "contact",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: input.value
        })
    })
}

function sendDataXhr(e){
    e.preventDefault(); //prevents page from reloading after submit
    console.log(input.value, " submitted :)");
        const xhr = new XMLHttpRequest();
        xhr.open("POST", baseUrl + "contact", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            console.log("Status, Response: ", xhr.status, xhr.responseText, xhr.readyState);
            if(xhr.readyState === 4 && xhr.status === 200){
                alert('Email sent');

            }else{
                alert("Alert: Error");
            }            
        }
        xhr.send(JSON.stringify(input.value));
}

function sendDataXhrPromise(e){
    e.preventDefault(); //prevents page from reloading after submit
    //console.log(input.value, " submitted :)");
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open("POST", baseUrl + "contact", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            console.log("Response Text: ",xhr.responseText, typeof(xhr.responseText), xhr.status, xhr.readyState);
            if(xhr.readyState === 4 && xhr.status === 200){
                resolve(`resolve ${xhr.response}`);
                alert('Email sent');                

            }else{
                alert("Alert: Error");
                reject(`reject: ${xhr.statusText}`);
            }            
        }
        xhr.send(JSON.stringify(input.value));
    });
        
}