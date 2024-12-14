"use strict";

console.log("---use Constructor function to build an object using function---");

// We can use Constructor function to build an object using function:

// Constructor function is a completely normal function:
// NOTE: THE ONLY DIFFERENCE BETWEEN A REGULAR FUNCTION AND A CONSTRUCTOR FUNCTION: WE CALL THE CONSTRUCTOR FUNCTION USING new KEYWORD.

// Let's create a constructor function for a person:
// A Convention => A Constructor function starts with CAPITAL LETTER:

// NOTE: Both Function expression and Function declaration are working here, but we can not use Arrow Function, because it doesn't have its own this keyword and we need that here!
const Person = function (firstName, birthYear) {
  console.log(this); // As we see in Note No.1 => 'this' keyword would be the empty object => Person {}

  // this.property = parameter => we assign the property to that object!
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// As said already, the only difference between Regular Function and Constructor Function is: we have to call a Constructor Function with new keyword BUT IN A REGULAR FUNCTION, WE NEED TO CALL A FUNCTION WITH ITS OWN NAME AND WITHOUT new Keyword!
const jonas = new Person("Jonas", 1991);
console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991} => Info about Person Object!

// NOTE: after calling a Constructor Function with new Keyword, FOUR STEPS WILL HAPPEN:

// 1. A new empty object{} is created!
// 2. function is called and this keyword is set to this newly created empty object => this = {}
// 3. This newly empty created object is linked to a Prototype
// 4. The object that was created in the beginning, dann is automatically returned from the Constructor function =! The function automatically returns empty object {} from the beginning! and at this point the object no longer needs to be empty and this is the trick making the constructor function works => WE DON'T NEED TO WRITE THE RETURN WORD MANUALLY! FUNCTION DOES RETURN AUTOMATICALLY!

// NOTE: IN A REGULAR OBJECT this kEYWORD POINTS OUT TO THE OBJECT ITSELF, BUT HERE AS WE USE CONSTRUCTOR FUNCTION AND new KEYWORD(OPERATOR) TO CREATE AN OBJECT, this KEYWORD POINTS TO A NEW EMPTY OBJECT AND NOT THE OBJECT ITSELF!

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);

console.log(matilda, jack);
/* 
Person {firstName: 'Matilda', birthYear: 2017} 
Person {firstName: 'Jack', birthYear: 1975}
*/

// Jonas, Matilda and Jack are three instances of Person Object!
// AND EVEN THERE IS AN OPERATOR TO TEST THAT:
console.log(jonas instanceof Person); // true

const jay = "Jay";
console.log(jay instanceof Person); // false => because we didn't created this variable(instance) using any Constructor Function!
