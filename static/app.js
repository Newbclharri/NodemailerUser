
console.log("connected");
const baseUrl = "http://localhost:3000/"
const form = document.querySelector("form");
const nameUser = document.getElementById("name-field");
const email = document.querySelector("#user-email");
const subject = document.querySelector("#subject-email");
const message = document.querySelector("#message-email");
const button = document.getElementById("send");


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const emailData = {
        nameUser: nameUser.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    
    }
    // sendDataXhrPromise(baseUrl, emailData)
    // .then(console.log("data sent"))
    // .catch(err=>{console.log(err)})

    sendDataAjax(baseUrl, emailData)
});

async function sendDataXhrPromise(url, obj){
    console.log(obj.subject, " submitted :)");
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url + "contact", true);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = function(){
            console.log("Response Text: ",xhr.responseText, typeof(xhr.responseText), xhr.status, xhr.readyState);
            if(xhr.readyState === 4 && xhr.status === 200){                
                alert('Email sent');
                resolve(`resolve ${xhr.response}`);                

            }else{
                alert("Alert: Error");
                reject(`reject: ${xhr.statusText}`);
            }            
        }
        xhr.send( JSON.stringify(obj));
    });        
}

function sendDataAjax(url, obj){
    console.log(obj.subject, " submitted :)");
    if(!obj.message){return};
    fetch("http://localhost:3000/contact",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
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

// function sendDataXhrPromise(url, obj){
//     console.log(obj.subject, " submitted :)");
//     return new Promise((resolve, reject)=>{
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", url + "contact", true);
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         xhr.onload = function(){
//             console.log("Response Text: ",xhr.responseText, typeof(xhr.responseText), xhr.status, xhr.readyState);
//             if(xhr.readyState === 4 && xhr.status === 200){
//                 resolve(`resolve ${xhr.response}`);
//                 alert('Email sent');                

//             }else{
//                 alert("Alert: Error");
//                 reject(`reject: ${xhr.statusText}`);
//             }            
//         }
//         xhr.send(JSON.stringify(obj));
//     });        
// }

// function sendDataXhrPromise(url, obj){
//     console.log(obj.subject, " submitted :)");
//     return new Promise((resolve, reject)=>{
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", url + "contact", true);
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         xhr.onload = function(){
//             console.log("Response Text: ",xhr.responseText, typeof(xhr.responseText), xhr.status, xhr.readyState);
//             if(xhr.readyState === 4 && xhr.status === 200){
//                 resolve(`resolve ${xhr.response}`);
//                 alert('Email sent');                

//             }else{
//                 alert("Alert: Error");
//                 reject(`reject: ${xhr.statusText}`);
//             }            
//         }
//         xhr.send(JSON.stringify(obj));
//     });        
// }


// function sendDataXhrPromise(url, obj){
//     console.log(obj.subject, " submitted :)");
//     return new Promise((resolve, reject)=>{
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", url + "contact", true);
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         xhr.onload = function(){
//             console.log("Response Text: ",xhr.responseText, typeof(xhr.responseText), xhr.status, xhr.readyState);
//             if(xhr.readyState === 4 && xhr.status === 200){
//                 resolve(`resolve ${xhr.response}`);
//                 alert('Email sent');                

//             }else{
//                 alert("Alert: Error");
//                 reject(`reject: ${xhr.statusText}`);
//             }            
//         }
//         xhr.send(JSON.stringify(obj));
//     });        
// }