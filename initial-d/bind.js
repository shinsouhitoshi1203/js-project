
// let car_li = ["BMW", "Toyota"]

const CarSystem = (()=>{
    const Cars = [];

    // selectors
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    // dom items

    const input = $('input[type="text"]');
    const submit = $('button.submit');
    const list = $('ul.list');

    return {
        view() {
            const htmls = Cars.map((e,i)=>`
                <li data-carID="${i}"><span>${e}</span>&nbsp;&nbsp;<button class="edit">edit</button>&nbsp;&nbsp;<button class="delete">delete</button></li><br>`
            ).join("");
            list.innerHTML = htmls;
        },
        push(newCar) {
            Cars.push(newCar);
            this.view();
        },
        kill(index) {
            Cars.splice(index,1);
            this.view();
        },
        submit() {
            if (input.value) this.push(input.value); else throw new Error ("Must type a name");
            input.focus();
            input.value = "";
        },
        modify() {
            const i = input.dataset.modify;
            Cars[i] = input.value;
            submit.innerHTML = "submit new car";
            $(`.list li[data-carid="${i}"] span`).innerText = input.value;
            input.value = "";
            input.focus();
        },
        runEvent() {
            submit.addEventListener("click",()=>{
                if (input.dataset.modify) {
                    this.modify();
                } else {
                    this.submit();
                }
            })
            input.addEventListener("keypress", (e)=> {
                if (e.key=="Enter") {
                    if (input.dataset.modify) {
                        this.modify();
                    } else {
                        this.submit();
                    }
                } 
            });

            list.addEventListener("click", (e)=>{
                const btnDelete = (e.target.closest(".delete"));
                if (btnDelete) {
                    const itemIndex = btnDelete.parentNode.dataset.carid;
                    this.kill(itemIndex);
                }
            });
            list.addEventListener("click", (e)=>{
                const btnEdit = (e.target.closest(".edit"));
                if (btnEdit) {
                    const itemIndex = btnEdit.parentNode.dataset.carid;
                    input.dataset.modify = itemIndex;
                    input.value = btnEdit.parentNode.querySelector("span").innerText;
                    input.focus();
                    submit.innerText = "modify text"
                }
            })
        },
        init() {
            input.dataset.modify = "";
            this.view();
            this.runEvent();
        }
    }
})();


CarSystem.init();



