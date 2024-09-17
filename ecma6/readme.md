# ecma javascript 6 (2015)
## 1. `let` and `const`
> structure: 
> ```js
> let variable = value;
> const constant = value2;
> ```

let and const can be used to declare a variable in javascript

### differences
#### a. scope 
1. let and const can't be used outside of the codeblock. (eg. `if, else`, `for`and  `{...}`);
2. let and const don't allow duplicated declarations **under the same codeblock**.

![image](https://github.com/user-attachments/assets/950f0b0b-11fb-469d-b1d0-74573f79e47f)

3. in case of declarations in different codeblocks, the let statement in the latest line will be applied.

```js
{
    let fuck = 1;
    {
        let fuck = 9;
        console.log(fuck); // 9
    }
    console.log(fuck); // 1
	// the let statement inside this codeblock isn't applied to it
}
```
#### b. hoisting
> hoisting means to put the declaration to the top of codeblock.

both `let` and `const`, unlike `var`, don't support **the hoisting feature**. that means you will have to** declare the variable first**, then assign the value later.

```js
let smth= "lorem";
smth = 120;
```
#### c. assignability
**var's** values and **let's** values are able to be assigned, in the other hand, **const's** values aren't.
> this only applies to assigning value only. don't be dumb w/ object's case

## 2. arrow functions
> structure: 
> ```js
> (arguments) => {...}
> // or (arguments)=>[1 statement] / [value-to-return]
> ```

**usage**: used as a replacement to function () {}, used mostly in expression declarations. 

*arrow functions don't support contexts, so that means you aren't able to use it with object constructors, or any f() using **this***

## 3. enhanced literal objects
feeling bored when you keep declaring variables and then put them to objects with the exact name? then this enhancing literal objects is your solutions. you can reduce the code time by using some tricks from ES6+
> structure: 
> ```js
> let userName = "John Doe";
> let age = 46;
> let student = {
>   	userName, age
> }
> ```

![image](https://github.com/user-attachments/assets/a5625d9a-6919-4a80-93a2-2840b01d065b)
<br>
... surprising isn't it?

this useful feature isn't limited to only variables, you can also declare a function without using the `function` keyword.
> structure: 
> ```js
> let object = {
> 		sum() {return 20+30;}
> }
> ```

and the result is. . .
![image](https://github.com/user-attachments/assets/571700ba-07e1-47b0-81bf-8da8a6828e3e)

## 4. javascript destructuring and ...rest
### a. destructuring
destructuring means to "unwrap" an **array** (or an **object**) and declare variables in order to retrieve each elements of the **array** (or the **object**).

#### i. array destruction
the following image represent how ecmascript6+ destructure an array. . .
![image](https://github.com/user-attachments/assets/7bb95e14-224f-4c96-b188-8a764d562d3e)

the first line is the variable declared when destructuring, and the last line is the list of element in the array.
each element of the array will be the value of each variable *respectively*. therefore, in this case, the first element, 1, will be the value of the a variable

**structure** 


```[var | let | const] [ var1, var2, var3, (...) ] = arrayName; ``` (for variable only)

or. . .
```[var | let | const] { var1, var2, var3, (...) } = objectName; ``` (for object only)

>[!NOTE] 
>if the number of declared variables isn't equal to the length of an array, each element will be assign to each variable, respectively
![image](https://github.com/user-attachments/assets/8890469a-a1de-482d-a67c-c666d7b1b4dd)

>[!NOTE] 
>if you try to destructure an array and add it to object, the value of each variable is `undefined`. see the example below.

```let {a,b,c} = [1,2,3]; // undefined undefined undefined```
#### ii. object destruction
for destructuring object, variables' name must be the property name of the object. this is a must.
![image](https://github.com/user-attachments/assets/74d78b49-dd07-43a9-81ee-cefbd9bc4ba2)
<br>result:<br>
![image](https://github.com/user-attachments/assets/e9a13f63-5879-4299-8fd1-619432181ff1)



## 5. classes




