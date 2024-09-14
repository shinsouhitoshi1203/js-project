# ecma javascript 6 (2015)
## 1. `let` and `const`
> structure: 
> ```js
> let variable = value;
> const constant = value2;
> ```

let and const can be used to declare a variable in javascript

### difference
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
####b. hoisting
> hoisting means to put the declaration to the top of codeblock.

both `let` and `const`, unlike `var`, don't support **the hoisting feature**. that means you will have to** declare the variable first**, then assign the value later.

```js
let smth= "lorem";
smth = 120;
```
#### c. assignability
**var's** values and **let's** values are able to be assigned, in the other hand, **const's** values aren't.
> this only applies to assigning value only. don't be dumb w/ object's case

##2. arrow functions
> structure: 
> ```js
> (arguments) => {...}
> // or (arguments)=>[1 statement] / [value-to-return]
> ```

**usage**: used as a replacement to function () {}, used mostly in expression declarations. 

*arrow functions don't support contexts, so that means you aren't able to use it with object constructors, or any f() using **this***

## 3. enhanced literal objects

## 4. javascript destructuring and ...rest

## 4. classes




