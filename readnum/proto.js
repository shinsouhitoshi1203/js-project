class VietNum {
    #groupDigit = [];
    #thousandMap = [];
    #millionMap = [];
    #billionMap = [];
    #digit = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mốt", "lăm"];
    #sub_digit = {
        remain: "lẻ",
        ty: "mươi",
        teen: "mười",
        hundred: "trăm",
        thousand: "nghìn",
        million: "triệu",
        billion: "tỉ",
    };

    // trim input from '0000333' to '3333'
    #trim(stringInput) {
        while ((stringInput.indexOf("0") == 0) && stringInput.length > 1) {
            stringInput = stringInput.slice(1);
        }
        return stringInput;
    }

    // check if any digit groups is zero
    #isZero(input, digitCount = 2) {
        switch (digitCount) {
            case 2:
                return (Number.parseInt(input.slice(1)) == 0) ? true : false;
                break;
            case 3:
                return (Number.parseInt(input) == 0) ? true : false;
                break;
            default:
                throw new Error("Invalid digit count to check fully zero");
                break;
        }
    }

    // split the digit to 3-digit groups
    #splitDigit() {
        let stringInput = this.number;
        let n = stringInput.length;
        let r = n % 3;
        for (let i = Math.trunc(n / 3) - 1; i >= 0; i--) {
            this.#groupDigit.push(stringInput.slice(r + 3 * i, r + 3 * i + 3));
        }
        if (r) this.#groupDigit.push(stringInput.slice(0, r));
    }

    #thousandDigit() {
        let n = this.#groupDigit.length // gd stands for groupDigits
        if (n == 1) return [];
        let thousandMap = [];
        if (this.#isZero(this.#groupDigit[n - 2], 3) == false) thousandMap.push(n - 2);

        if (n - 2 == 0) {
            this.#thousandMap = thousandMap;
            return 0;
        } else {
            for (var i = 1; i <= Math.trunc((n - 2) / 3); i++) {
                if (this.#isZero(this.#groupDigit[(n - 2) - 3 * i], 3) == false) thousandMap.push((n - 2) - 3 * i);
            }
        }
        this.#thousandMap = (thousandMap);
    }

    #millionDigit() {
        let millionMap = [];
        let n = this.#groupDigit.length;
        for (var i = 1; i <= Math.trunc(n / 3); i++) {
            if (this.#isZero(this.#groupDigit[n - 3 * i], 3) == false) millionMap.push(n - 3 * i);
        }
        this.#millionMap = millionMap
    }

    #billionDigit() {
        let n = this.#groupDigit.length; // gd stands for groupDigits
        if (n < 4) return [];
        let billionMap = [];
        billionMap.push(n - 1 - 3);
        if (n - 4 == 0) {
            this.#billionMap = billionMap;
            return 0;
        } else {
            for (var i = 1; i <= Math.trunc((n - 4) / 3); i++) {
                billionMap.push((n - 4) - 3 * i);
            }
        }
        this.#billionMap = (billionMap);
    }

    #mapAll() {
        this.#thousandDigit();
        this.#millionDigit();
        this.#billionDigit();
    }

    #hashEachDigit(digitInput, i) {
        function reArrange([f, s, t]) {
            let a, b, c;
            a = b = c = "0";
            if (t == undefined) {
                if (s == undefined) {
                    c = f;
                } else {
                    c = s;
                    b = f;
                }
            } else {
                c = t;
                b = s;
                a = f;
            }
            return [a, b, c];
        }
        let arrOutput = [];
        let [h, t, u] = (reArrange(digitInput));

        // thousand
        if (this.#thousandMap.includes(i)) {
            arrOutput.unshift(this.#sub_digit.thousand);
        }
        // million
        if (this.#millionMap.includes(i)) {
            arrOutput.unshift(this.#sub_digit.million);
        }
        // billion
        if (this.#billionMap.includes(i)) {
            arrOutput.unshift(this.#sub_digit.billion);
        }

        // tens and units
        if ((0 == t) && (0 < u)) {
            let temp = this.#digit[u];
            if (i != 0) temp = this.#sub_digit.remain + " " + temp;
            arrOutput.unshift(temp)
        } else if ((1 == t) && (0 < u)) {
            arrOutput.unshift(`${this.#sub_digit.teen} ${this.#digit[((u==5)?11:u)]}`);
        } else if ((1 == t) && (0 == u)) {
            arrOutput.unshift(`${this.#sub_digit.teen}`);
        } else if ((1 < t) && (0 == u)) {
            arrOutput.unshift(`${this.#digit[t]} ${this.#sub_digit.ty}`);
        } else if ((1 < t) && (0 < u)) {
            let special = u;
            if (u == 5) special = 11;
            if (u == 1) special = 10;
            arrOutput.unshift(`${this.#digit[t]} ${this.#sub_digit.ty} ${this.#digit[special]}`);
        }

        // hundred
        if (this.#isZero(digitInput, 3) == false)
            if (i != 0) {
                arrOutput.unshift(`${this.#digit[h]} ${this.#sub_digit.hundred}`)
            } else {
                if (0 < h) arrOutput.unshift(`${this.#digit[h]} ${this.#sub_digit.hundred}`)
            };

        return arrOutput.join(" ");
    }

    #processHandler() {
        let arrOutput = [];
        this.#groupDigit.forEach(
            (digitGroup, i) => {
                let digitString = this.#hashEachDigit(digitGroup, i);
                if (digitString) arrOutput.push(digitString);
            }
        )
        return arrOutput.join(" ");
    }

    format(splitDigit = ".") {
        var stringOutput = this.#groupDigit.reverse().join(splitDigit);
        console.log(stringOutput);
    }

    read() {
        const capitalize = (stringInput) =>
            (stringInput[0].toUpperCase() + stringInput.slice(1));
        this.#mapAll();
        var raw = this.#processHandler();
        console.log(capitalize(raw));
    }

    constructor(numberInput = "", typeInput = "number") {
        this.flag = typeInput;
        this.number = this.str = undefined;

        // flags for any errors and warnings
        if (Number.isNaN(Number.parseFloat(numberInput))) throw new Error("Invalid input! Try again");
        if (!["string", "number"].includes(typeof numberInput)) throw new Error("Invalid input! Try again");
        if (typeof numberInput == "number") {
            if (numberInput > Math.pow(2, 50)) {
                numberInput = BigInt(numberInput).toString();
                console.warn("The input number is too big to proceed. Consider converting it to string");
            }
        }

        // next steps
        if (this.flag == "number") {
            this.number = this.#trim(numberInput);
            this.#splitDigit();
        } else if (this.flag == "string") {
            this.str = numberInput.toString();
        } else {
            throw new Error("Invalid input");
        }
    }
}
