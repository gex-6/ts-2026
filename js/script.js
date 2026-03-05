'use strict';

console.log('Hello JS');
console.log('Hello JS 2');

// Shift + Option ⌥ + A
/*  */

const variableName = "John";



/* 

щодо неймінгу змінних
-> не можна використовувати зарезервовані слова (switch, console, etc.)
-> 1name -- неможливо починати назву з числа
-> name i Name -- це будуть різні змінні (case sensisitive)
-> camelCase

*/

typeof 42 // number
typeof "hello" // string
typeof true // boolean
typeof undefined // undefined
typeof null // object
typeof {} // object
typeof [] // object
typeof function () { } // function


// явне приведення типів
let number = 5;
let b = number.toString();
console.log(b)

let string = "42";
let c = Number(string);
console.log(c) // але якщо там буде не число в строці, то отримаємо NaN

let emptyString = "";
let d = Number(emptyString);
console.log(d) // 

Number("10");    // 10

String(25);      // "25"

Boolean(0);      // false