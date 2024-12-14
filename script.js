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
// HERE WE WILL HAVE ONLY ONE COPY OF THIS METHOD AND EVERY OBJECT USES THIS METHOD AGAIN AND AGAIN BUT WILL NOT COPY IT 1000 TIMES WHEN WE CREATE 1000 OBJECTS, ONLY ONE METHOD AND REUSE IT SEVERAL TIMES AS LONG AS THE NUMBERS OF OUR OBJECTS!
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear); // 46 , 20
  // this keyword here sets to the object which calls the method! if it is jonas, this keyword sets to the jonas and so on...
};

// And now, all the instances like jonas, matilda and jack that we already created, have access to all property and methods which were created by Person object using Constructor function:

console.log(jonas.firstName); // Jonas
console.log(jonas.birthYear); // 1991
jonas.calcAge(); // 46

console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991}
// AS WE CAN SEE, the jonas doesn't include the calcAge() method, BUT BECAUSE OF PROTOTYPE, WE HAVE ACCESS TO THE calcAge METHOD TOO!
matilda.calcAge(); // 20

// TO GET THE PROTOTYPE OF Jonas Object:
console.log(jonas.__proto__); // {calcAge: ƒ}
console.log(jonas.__proto__ === Person.prototype); // true

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// NOTE: THE BEST NAME OF prototype is suggested from Jonas is: .prototypeOfLinkedObjects => when we take a look at this statement: Person.prototype.isPrototypeOf(Person) with this suugested name, we understand why it is False => It is false because the Person is not the prototype of linked objects, the linked objexts here are like jonas, matilda, ... and NOT the Person. Therefore, we get the True answer for jonas and matilda and False for Person!

Person.prototype.species = "Homo Sapines";
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty("firstName")); // true => firstName and lastName are direct properties of jonas Object, that's why the answer is true!

console.log(jonas.hasOwnProperty("species")); // false => this is not a direct property in jonas Object, rather, this is a prototype property in Person object(an indirect property)
