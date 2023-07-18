
console.log("connected");
const baseUrl = "http://localhost:7000/"
const form = document.querySelector("form");
const nameUser = document.getElementById("name-field");
const email = document.querySelector("#user-email");
const subject = document.querySelector("#subject-email");
const message = document.querySelector("#message-email");
const button = document.getElementById("send");


form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const emailData = {
        nameUser: nameUser.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    
    }
    // const formData = new FormData(form);
    // const encodedData = new URLSearchParams(formData);
    console.log(emailData.message);
    await fetch(baseUrl + "contact", {
        method: "post",
        headers: {
           "Content-Type": "application/x-www-form-urlencoded"
        },
        body: String(emailData.message),
    });
    // sendDataXhrPromise(baseUrl, emailData)
    // .then(console.log("data sent"))
    // .catch(err=>{console.log(err)})

    // sendDataAjax(baseUrl, emailData)
});

function sendDataXhrPromise(url, obj){
    console.log(obj.subject, " submitted :)");
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url + "contact", true);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = function(){
            console.log("Response Text: ",xhr.responseText, typeof(xhr.responseText), xhr.status, xhr.readyState);
            if(xhr.readyState === 4 && xhr.status === 200){                
                alert('Email sent');
                resolve(obj);
                //resolve(`resolve: ${xhr.response}`)                

            }else{
                alert("Alert: Error");
                reject(`reject: ${xhr.statusText}`);
            }            
        }
        xhr.send( JSON.stringify(obj));
    });        
}

async function sendDataAjax(url, obj){
    console.log(obj.subject, " submitted :)");
    if(!obj.message){return};
    await fetch("http://localhost:3000/contact",{
        method: "post",
        // headers: {
        //     "Content-Type": "application/x-www-form-urlenconded",
        // },
        body: obj
    })
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
}

function sendDataXhr(){
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
        xhr.send(JSON.stringify(data));
}