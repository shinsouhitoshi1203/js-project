function numberFormat(input) {
    // data
    var digit = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mốt", "lăm"];
    var sub_digit = {
        remain: "lẻ",
        ty: "mươi",
        teen: "mười",
        hundred: "trăm",
        thousand: "nghìn",
        million: "triệu",
        billion: "tỉ",
    };

    // grouping digit
    function groupDigit(input) {
        var l = input.length, arr=[];
        if (input.substr(0,l%3)) arr.push(input.substr(0,l%3));
        for (var i=Math.trunc(l/3);i>0;i--) {
            var n = (l-3*i);
            arr.push(input.slice(n,n+3));
        }
        return arr;
    }

    // mapping thousand digits
    function getThousandMap(arrInput) {
        var arrOutput = []; 
        if (arrInput.length==1) return arrOutput;
        var l = arrInput.length;
        if (Number.parseInt(arrInput[l-2])) arrOutput.push(l-2); 
        l=l-2;
        if (l==0) return arrOutput;
        arrInput = arrInput.slice(0, l)
        for (var i=1;i<=Math.trunc(l/3);i++) {
            var n = l-3*i;
            if ((n>=0)&&(Number.parseInt(arrInput[n]))) arrOutput.unshift(n);
        }
        return arrOutput;
    }

    // mapping million digits
    function getMillionMap(arrInput) {
        var l = arrInput.length, arrOutput=[];
        if (l<3) return arrOutput;
        for (var i=Math.trunc(l/3);i>0;i--) {
            var n = (l-3*i);
            if ((n>=0)&&(!isFullyMultiZero(arrInput[n])))
                 arrOutput.push(n);
        }
        return arrOutput;
    }
    
    // mapping billion digits
    function getBillionMap(arrInput) {
        var l = arrInput.length, arrOutput=[];
        for (var i=Math.trunc(l/3);i>0;i--) {
            var n = (l-3*i);
            if (n) arrOutput.push(n-1);
        }
        return arrOutput;
    }

    // check for any "00" or "000"
    function isMultiZero(input) {
        if (Number.parseInt(input.slice(1))) return false; else return true;
    }
    function isFullyMultiZero(input) {
        if (Number.parseInt(input.slice(0))) return false; else return true;
    }

    // format number with . digit
    function format(a) {
        return a.join('.');
    }

    // enforce value to correct type: hundreds-tens-units. uncomment to see example belows
    /* 
        2,undefined,undefined  ==> 0,0,2
        3,2,undefined          ==> 0,3,2
        2,1,3                  ==> 2,1,3
    */
    function retrieve([aa,bb,cc]) {
        var t,c,d;
        if (cc==undefined) {
            if (bb==undefined) {
                d=aa; t=c='0';
            } else {
                d=bb; c=aa; t='0';
            }
        } else {
            t=aa; c=bb; d=cc;
        }
        return [t,c,d];
    }

    // gathering digit groups
    var digitGroup = groupDigit(input);

    // gathering maps
    var billionMap = getBillionMap(digitGroup);
    var millionMap = getMillionMap(digitGroup);
    var thousandMap = getThousandMap(digitGroup);
    
    // main function
    function hundredHandler([t,c,d], hundred, index) {
        var n = digitGroup.length - 1;
        var exportStr = [];
        var curDigit = digitGroup[index]; // current digit group

        t =Number.parseInt(t);
        c =Number.parseInt(c);
        d =Number.parseInt(d);

        // check for some additional sub digit
        if (thousandMap.includes(index)) {
            exportStr.unshift(sub_digit.thousand);
        } else if (millionMap.includes(index)) {
            exportStr.unshift(sub_digit.million);
        } else if (billionMap.includes(index)) {
            exportStr.unshift(sub_digit.billion);
        }

        
        if (d) {  
            if ((c>1)&&(d==1)) { //31
                exportStr.unshift(`${digit[10]}`);
            } else if ((c>1)&&(d==0)) {
                // nothing works here because we have x-ty
            } else if ((c)&&(d==5)) { // 15 25 35 45
                exportStr.unshift(`${digit[11]}`);
            } else { // 33 99 94
                exportStr.unshift(`${digit[d]}`);
            }
        } else { //09 01
            if ((!isMultiZero(curDigit)) && (c==0)) exportStr.unshift(`${digit[d]}`);
        }

        // check for other digits 
        switch (c) {
            case 0:
                if (!isMultiZero(curDigit)) exportStr.unshift(`${sub_digit.remain}`);
                break;
            case 1:
                exportStr.unshift(`${sub_digit.teen}`)
                break;
        
            default:
                exportStr.unshift(`${digit[c]} ${sub_digit.ty}`)
                break;
        }

        // check for hundred digits
        if (index==0) {
            if (t!=0) exportStr.unshift(`${digit[t]} ${sub_digit.hundred}`)
        } else {
            if (!isFullyMultiZero(curDigit)) exportStr.unshift(`${digit[t]} ${sub_digit.hundred}`);
        }

        return exportStr.join(" ");
    }

    function process(arrInput) {
        var res = [], realResult;
        var l = arrInput.length;
        for (var i=l-1;i>=0;i--) {
            var cur = retrieve(digitGroup[i]);
            var element = hundredHandler(cur, digitGroup[i], i);
            if (element) res.unshift(element);
        };
        realResult = res.join(" "); realResult = realResult[0].toUpperCase()+realResult.slice(1);
        return realResult;
    }

    return process(digitGroup);
}
