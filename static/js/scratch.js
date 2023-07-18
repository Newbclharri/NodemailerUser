
console.log("Testing FormData:");
const formTest = document.querySelector(".email-form");
const nameUserTest = document.querySelector("#name-field");
const userEmailTest = document.querySelector("#user-email");
const subjectTest = document.querySelector("#subject-email");
const messageTest = document.querySelector("#message");

console.log("formTest: ", formTest);

//submit event handler:
formTest.addEventListener("submit", async (e)=>{
    e.preventDefault();
    console.log("submit clicked");
    // const emailDataTest = {
    //     nameUserTest: nameUserTest.value,
    //     userEmailTest: userEmailTest.value,
    //     subjectTest: subjectTest.value,
    //     messageTest: messageTest.value
    // }

    const formData = new FormData(formTest);
    const data = new URLSearchParams(formData);
   
    for(const [key, value] of formData){
        console.log(`${key}: ${value}`)
    }
    
    await fetch("http://localhost:7000/contact", {
        method: "post",
        body: data
    })

})