import ToastMsg from "./toast.js";

/* 
    A = toast height: 72
    B = toast top: x px?

    new toast position-top = 20 + A + B;
*/
// var 

var messageSamples = {
    warning: {
        messageType: "warning", // only for calling icons
        messageMainColor: "#fff100",
        messageTypeDisplay: "Warning",
        messageNameDisplay: "Lorem ipsum dolor sit.", 
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    // activate by clicking
    let $ = document.querySelector.bind(document);
    let $$ = document.querySelectorAll.bind(document);
    
    $('.btn__warning').addEventListener("click", function (e) {
        let toast = new ToastMsg(messageSamples.warning); //
        toast.create();
    })
})

