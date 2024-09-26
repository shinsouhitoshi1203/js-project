import ToastMessage from "./toast.js";
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
const data = {
    online: {
        type: "success",
        message: "Your connection has been restored",
    },
    offline: {
        type: "error",
        message: "You have lost connection to the internet.",
    },
}
window.ononline = () => {
    const toast = new ToastMessage(data.online);
    toast.show();
}
window.onoffline = () => {
    const toast = new ToastMessage(data.offline);
    toast.show();
}

function run() {const toast = new ToastMessage(data.offline);
toast.show();}

document.addEventListener("DOMContentLoaded",()=>{
    $("body > button").addEventListener("click", run)
})