class Book {
    
    randommize() {
        let stringOutput = "";
        let charRange = ["0","1","2","3","4","5","6","7","8","9",'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        const oneChar = ()=>{
            let a = Math.floor(Math.random()*(61-0+1)+0);
            return (charRange[a]); 
        }
        for (let i=1;i<=8;++i) stringOutput+=oneChar();
        return stringOutput;
    }

    constructor (name,author,year) {
        this.bookID = this.randommize();
        this.bookName = name;
        this.author = author;
        this.dateUploaded = `${new Date().toDateString()} ${new Date().toTimeString()}`;
        this.yearPublished = year;
        this.isBorrowed = false;  
        this.borrowedBy = undefined;
    }

    borrow(student) {
        var studentID = student.studentID;
        if (!this.isBorrowed) {
            if (student.borrowedBooks.length>=5) {
                console.log(`Student ${student.fullName("ltf")} cannot borrow more than 5 books! `)
            } else {
                this.borrowedBy = studentID;
                this.isBorrowed = true;
                student.borrowedBooks.push(this.bookID);
            }
        } else {
            console.log("This book has already been borrowed! ")
        }
    }
    return(student) {
        let targetIndex = student.borrowedBooks.findIndex((bookID)=>bookID==this.bookID);
        function handler(book) {
            book.borrowedBy = undefined;
            book.isBorrowed = false;
            student.borrowedBooks.splice(targetIndex, 1);
        }
        if (targetIndex==-1) {
            console.log (`Student ${student.fullName("ltf")} haven't borrowed the book! `);
        } else {
            handler(this);
        }
    }


    showInfo() {
        return (`BookName: ${this.bookName},
Author: ${this.author},
Year: ${this.yearPublished},
Status: ${this.dateUploaded}`)
    }
}

class Student{
    randommize() {
        let stringOutput = "";
        let charRange = ["0","1","2","3","4","5","6","7","8","9",'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        const oneChar = ()=>{
            let a = Math.floor(Math.random()*(61-0+1)+0);
            return (charRange[a]); 
        }
        for (let i=1;i<=15;++i) stringOutput+=oneChar();
        return stringOutput;
    }
    constructor (fName=undefined, lName=undefined, age=undefined, className=undefined, kosei=[], point=0) {
        this.studentID = this.randommize();
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.className = className;
        this.kosei = kosei;
        this.hp = point;
        this.borrowedBooks = [];
    }

    yap() {
        this.hp -= 10;
    }

    fullName(dir = "ftl") {
        return (dir=="ftl") ? `${this.firstName} ${this.lastName}` : `${this.lastName} ${this.firstName}`;
    }

    listKosei() {
        if (!this.kosei==[]) {
            this.kosei.forEach((k,i)=>console.log(`Kosei ${++i}: ${k}`));
        } else {
            console.log("Quirkless");
        }
    }
}



////// test here 

var student1 = new Student("Izuku", "Midoriya", 16, "1A", ["Fa Gin", "Gearshift", "Black Whip", "Smoke", "Floating"], 443);
var student2 = new Student("Katsuki", "Bakugo", 16, "1A", ["Explosion"], 903);

var books = [
    new Book ("MA003", "Amajikan Kumar", 2009),
    new Book ("IT001", "Doo", 2011),
    new Book ("DDV11", "Amajikan Kumar", 2019),
    new Book ("CS001", "Godi Guptas", 2019)
]
console.log(books);
books[1].borrow(student1);
books[0].borrow(student1); 
console.log(student1.borrowedBooks);
console.log('wait for 10 secs . . .')
setTimeout(()=> {
    books[0].return(student1);
    console.log(` `)
    console.log(books);
    console.log(student1);
},10000)
