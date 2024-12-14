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
  // OR we can say they are Instance Properties, because the instances which are created later, they will have all these properties!
  this.firstName = firstName;
  this.birthYear = birthYear;

  // WE CAN ALSO ADD METHODS TO OUR OBJECT LIKE ABOVE PROPERTIES:
  // WE create a function and then assign it to the this.calcAge property, therefore, this property would be a Method in this object hereafter!

  // NEVER DO THIS => NEVER CREATE A METHOD INSIDE A CONSTRUCTOR FUNCTION: Because when we have 1000 or 10000 instances created from this methods which means 1000 or 10000 copies from this method which bring doen the performance of our object and overall Our code => That's why we will use Prototype in JS!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
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

console.log("----------------------Prototypes in JS-------------------------");

// Every function in JS has automatically a property called prototype and Every object which is produced using constructor function has access to this Prototype:

console.log(Person.prototype);

// AS WE CAN SEE, BECAUSE I USE THE prototype here, we can write the calcAge method outside of the Person object => it means here:
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear); // 46
};

// And now, all the instances like jonas, matilda and jack that we already created, have access to all property and methods which were created by Person object using Constructor function:

console.log(jonas.firstName); // Jonas
console.log(jonas.birthYear); // 1991
jonas.calcAge();
