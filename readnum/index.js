var number = "34328943";

var digit = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
var sub_digit = {
    remain: "lẻ",
    ty: "mươi",
    teen: "mười",
    hundred: "trăm",
    thousand: "nghìn",
    million: "triệu",
    billion: "tỉ",
};
/*

     T           T           T            
    37 942 388 032 984 727 832 789 787 498
    ba muoi hai TY, chin tram tam muoi bon trieu, bay tram hai muoi bay nghin, tam tram ba muoi hai TY, bay tram tam muoi chin trieu, bay tram tam muoi bay nghin, bon tram chin muoi tam.

    1 234
    mot nghin, hai tram ba muoi bon

    1 020
    mot nghin, khong tram hai muoi

    2 009
    hai nghin, khong tram le chin

    0
    khong

    10
    muoi

    2, 020
    hai nghìn, không trăm hai mươi
    1, 010
    một nghìn, không trăm mười ba
    không trăm mười không

*/



function readNum(input) {
    
    function push(string, stringToInput) {
        return stringToInput + string;
    }
    function format(a) {
        return a.join('.');
    }
    function getHundredMap(input) {
        var l = input.length, arr=[];
        if (input.substr(0,l%3)) arr.push(input.substr(0,l%3));
        for (var i=Math.trunc(l/3);i>0;i--) {
            var n = (l-3*i);
            arr.push(input.substr(n,3));
        }
        return arr;
    }
    function getThousandMap(a) {
        var l = a.length, arr=[];
        for (var i=Math.trunc(l/4);i>=0;i--) {
            var n = (l-1-4*i);
            arr.push(n);
        }
        arr[arr.length-1]--;
        return arr;
    }
    function getBillionMap(a) {
        var l = a.length, arr=[];
        for (var i=Math.trunc(l/3);i>0;i--) {
            var n = (l-3*i);
            if (n) arr.push(n-1);
        }
        return arr;
    }
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
    function hundredHandler([t,c,d], hundred, index) {
        
        var exportStr = "";
        console.log([t,c,d], hundred, (billionMap.includes(index)?d:''));
        // add million subfix
        exportStr = (thousandMap.includes(index)?` ${sub_digit.thousand}`:'') + exportStr; 
        // add million subfix
        exportStr = (((index%3==0)&&(!billionMap.includes(index)))?` ${sub_digit.million}`:'') + exportStr; 
        // add billion subfix
        exportStr = (billionMap.includes(index)?` ${sub_digit.billion}`:'') + exportStr;

        if (d==0) {
            if (c == 0) { // 00
                exportStr = " " + digit[t] + sub_digit.hundred + exportStr 
            } else { //30
                exportStr = " " + digit[c] + " " + sub_digit.ty + exportStr 
            }
        } else {
            if (c == 0) { // 03
                exportStr = ` ${(index==0)?'':sub_digit.remain} ${digit[d]} ${exportStr}` 
            } else { // 13 23
                exportStr = (c>1)?`${digit[c]} ${sub_digit.ty} ${digit[d]} ${exportStr}`: ` ${sub_digit.teen} ${digit[d]} ${exportStr}`
            }
        }
        exportStr = ((index==0)?'':` ${digit[t]} ${sub_digit.hundred} `) + exportStr

        return exportStr;
        // console.log(exportStr);
    }
    function process(a) {
        var res = [];
        var l = a.length;
        for (var i=l-1;i>=0;i--) {
            var cur = retrieve(hundredMap[i]);
            var element = hundredHandler(cur, hundredMap[i], i);
            console.log(element)
        };
        // var realResult = (res.join(" ").replace(/  /g," "));
        // realResult = realResult[0].toUpperCase()+realResult.substring(1);
        // console.log(realResult)
    }

    var hundredMap = getHundredMap(input);
    var thousandMap = getThousandMap(hundredMap);
    var billionMap = getBillionMap(hundredMap);

    console.log({hundredMap, thousandMap});
    console.log(format(hundredMap))
    process(hundredMap);
    
}

readNum("1")
/* 
37942388032984727832789787498
8-1*3 = 5
8-2*3 = 2

8 / 3 = 2 r2 


9/3 = 3

123456789

9-1*3 = 6
9-2*3 = 3
9-3*3 = 0

4 / 3 = 1;
4 - 

//digit[input[i]]



37.942.388.032.984.727.802.789.787.408
                     N           N     

  ___         ___
4.727.802.789.787.408
  T     ___   T     ___   T     ___
003.233.423.432.634.727.802.789.787.408

6  / 4 = 1 r2

6-0*4-1 = 5
6-1*4-1 = 1

9 / 4 = 2 r1;
9-0*4-1 = 8
9-1*4-1 = 4 
9-2*4-1 = 0


11 / 4 = 2 r3

4 / 4 = 1 r0

4-0*4-1 = 3

000.111.222.333.444.555.666.777.888
--------------
8 / 4 = 2 r0
[0;2)
8-0*4 -1 =7
8-1*4 =3

3.555.666.103.555.666.777.888
x         x           x

7/4=1 r3

8-0*4 -1 = 7
8-1*4 -1 = 4
8-2*4 = 0

10 / 4 = 2 r2
9-2*4 = 1;
9-1*4 = 5;
9-0*4 -1 = 8


*/