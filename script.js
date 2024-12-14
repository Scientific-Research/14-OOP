"use strict";

console.log("---use Constructor function to build an object using function---");

// We can use Constructor function to build an object using function:

// Constructor function is a completely normal function:
// NOTE: THE ONLY DIFFERENCE BETWEEN A REGULAR FUNCTION AND A CONSTRUCTOR FUNCTION: WE CALL THE CONSTRUCTOR FUNCTION USING new KEYWORD.

// Let's create a constructor function for a person:
// A Convention => A Constructor function starts with CAPITAL LETTER:

// NOTE: Both Function expression and Function declaration are working here, but we can not use Arrow Function, because it doesn't have its own this keyword and we need that here!
const Person = function (firstName, birthYear) {};

// As said already, the only difference between Regular Function and Constructor Function is: we have to call a Constructor Function with new keyword BUT IN A REGULAR FUNCTION, WE NEED TO CALL A FUNCTION WITH ITS OWN NAME AND WITHOUT new Keyword!
new Person("Jonas", 1991);

// NOTE: after calling a Constructor Function with new Keyword, FOUR STEPS WILL HAPPEN:

// 1. A new empty object{} is created!
// 2. function is called and this keyword is set to this newly created empty object => this = {}
// 3. This newly empty created object is linked to a Prototype
// 4. The object that was created in the beginning, dann is automatically returned from the Constructor function =! The function automatically returns empty object {} from the beginning! and at this point the object no longer needs to be empty and this is the trick making the constructor function works!
