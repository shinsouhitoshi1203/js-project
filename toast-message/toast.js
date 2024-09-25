function kill(element) {
    
}

let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
export default class ToastMsg {
    #rnd() {
        function generate(s = 65,e = 90) {
            let n = Math.trunc((Math.random() * (e - s + 1) ) +s );
            return String.fromCharCode(n);
        }
        let str = "", n;
        for (let i = 1;i<=6;++i) {
            n = Math.trunc((Math.random() * (2 - 0 + 1) ) +0);
            if (n==0) {
                str+=generate();
            } else if (n==1) {
                str+=generate(97,122);
            } else {
                str+=generate(48,57);
            }
        };
        return str;
    }
    constructor (objInput = {}) {
        if (objInput) {
            this.type = objInput.messageType;
            this.color = objInput.messageMainColor;
            this.displayType = objInput.messageTypeDisplay;
            this.displayText = objInput.messageNameDisplay;
            this.icon = this?.messageIcons[this.type];
            this.id = this.#rnd();
        } else {
            throw new Error ("The input is null, check again!")
        }
    }
    messageIcons = {
        warning: "fa-solid fa-circle-exclamation fa-xl",
        error: "fa-solid fa-circle-exclamation fa-xl",

    }
    
    handleEvent(from="inside", objOutside = {}) {
        const __id = this.id;
        function mapToast(id) {
            let f = 0, restToasts = [], prev = 1;
            if ($(`.toast[data-id="${__id}"]`)) {
                const Toasts = $(`.toast__container`).childNodes;
                Toasts.forEach((e,i)=>{
                    if (e.getAttribute("data-id") == id) {
                        f=1; prev = i-1;
                    } else {
                        if (f==1) restToasts.push(e);
                    }
                }) 
                return [prev,restToasts];
            }
        }

        function updateToast([prev,restToasts]) {
            if (restToasts.length==0) return 0;
            if (prev >= 0) {
                let t  = $$('.toast')[prev] ;
                let tTop = (t?.offsetTop)?t.offsetTop:0, 
                tHeight = (t?.offsetHeight)?t.offsetHeight:0;
                restToasts.forEach((e,i)=>{
                    let newTop = tTop+((tHeight?tHeight:20)+20)*(i+1);
                    e.style.setProperty('--toast-y', newTop+'px')
                })
            } else {
                $$('.toast')[0].style.setProperty('--toast-y', 20+'px'); 
                let t  = $$('.toast')[0];
                let tTop = (t?.offsetTop)?t.offsetTop:0, 
                tHeight = (t?.offsetHeight)?t.offsetHeight:0;
                restToasts.forEach((e,i)=>{
                    {
                        if (i!=0) {
                            let newTop = tTop+((tHeight)+20)*(i);
                            e.style.setProperty('--toast-y', newTop+'px');
                        }
                    }
                })
            }
        }

        function deleteToastHandler(objectInput) {
            function findParent(o) {
                let obj = o;
                while(!obj.classList.contains("toast")) {
                    obj = obj.parentNode;
                }
                return obj;
            }
            let _toast = findParent(objectInput);
            let theRest = mapToast(__id);
            _toast.remove();
            updateToast(theRest);
        }
        // close toast, then update the rest of toasts
        $(`.toast[data-id="${__id}"] .toast__close`)?.addEventListener("click",  (e) => {
            deleteToastHandler(e.target);
            e.stopPropagation();
        });

        if (from=="outside") {
            deleteToastHandler(objOutside);
        }

        
    }
    render() {
        const __id = this.id;
        let toastLatest  = $$('.toast')[ $$('.toast').length - 1 ] ;
        console.log([toastLatest], $$('.toast').length);
        let toastLatestTop = (toastLatest?.offsetTop)?toastLatest.offsetTop:0, 
            toastLatestHeight = (toastLatest?.offsetHeight)?toastLatest.offsetHeight:0;
        let newTop = toastLatestTop+toastLatestHeight+20;

        console.log(toastLatestTop, toastLatestHeight);

        const htmls = `<div class="toast" data-id="${this.id}" style="--toast-y:${newTop}px;">
    
    <div class="toast__inner">
        <div class="toast__icon">
            <i class="${this.icon}"></i>
        </div>
        <div class="toast__message">
            <span class="toast__message-type">${this.displayType}</span>
            <span>:</span>
            <p>${this.id}</p>
        </div>
        <a href="#!" class="toast__close" >
            <i class="fa-solid fa-xmark fa-sm"></i>
        </a>
    </div>
    
    <div class="toast__time-bar">
        <div class="toast__time-passed"></div>
    </div>
        </div>`;


        document.querySelector(".toast__container").insertAdjacentHTML("beforeend",htmls)
        // animation
            // toast popin
            
            // toast popout
            const loadBar = $(`.toast[data-id="${this.id}"] .toast__time-passed`).animate(
                [
                    {
                        transform: "scaleX(0)",
                    },
                    {
                        transform: "scaleX(100%)",
                    }
                ],
                {
                    duration: 5000,
                    iteration: 1,
                    easing: "linear",
                    // fill: "forwards",
                }
            );
            loadBar.play();
            loadBar.onfinish = () => {
                this.handleEvent("outside", $(`.toast[data-id="${__id}"]`))
            }
    } 
    clickClose(element) {
        
    }
    create() {
        this.render();
        this.handleEvent();
    }
}

