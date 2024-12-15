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

console.log("-------------Prototypal Inheritance on Built-In Objects--------");

console.log(jonas.__proto__); // {species: 'Homo Sapines', calcAge: ƒ}
// This is the prototype of Jonas which is prototype of Person that we had already as following:
console.log(jonas.__proto__ === Person.prototype); // true

// NOTE: Object.prototype (top of prototype chain)
// When we move up in Prototype chain:
console.log(jonas.__proto__.__proto__); // => Prototype property of object and actually the hasOwnProperty is there in this Object!

// and Let's us to go one step further
console.log(jonas.__proto__.__proto__.__proto__); // null because Object.prototype is usually the top of the scope chain!

console.log(Person.prototype.constructor); // we get the constructor function itslef => The Person Object

console.dir(Person.prototype.constructor); // with dir() instead of log(), we can see the Person Object directly!

// PROTOTYPE OF AN ARRAY:
const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__); // we see all the methods that we had already like filter, fill, every, find, findIndex, Reduce, ...
// THIS IS THE REASON, WHY ARRAYS GET ACCESS TO ALL OF THESE METHODS, BECAUSE EACH ARRAY DOESN'T CONTAIN ALL OF THESE METHODS, BUT INSTEAD, EACH ARRAY WILL INHERIT THESE METHODS FROM ITS PROTOTYPE!

console.log(arr.__proto__ === Array.prototype); // true, Array is constructor function of an array!

console.log(arr.__proto__.__proto__); // We have now the object property with all the methods which are available for object!

// LET's TAKE THIS ONE STEP FURTHER:
// We know at this point that, any Array inherits all their methods from its prototype
// WE CAN USE THIS KNOWLEDGE TO EXTEND THE FUNCTIONALITY OF ARRAYS EVEN FURTHER:

// We can add any new method to this prototype property of Array Constructor and all the arrays will then inherited this method => then we can call this method on every array that we want:
Array.prototype.unique = function () {
  // To get the unique numbers in an array:
  // SET GIVES US THE UNIQUE VALUES IN AN ARRAY:
  return [...new Set(this)]; // this keyword is the array(arr) on which this method would be called!

  // OR THE FOLLOWING => Both have the same Result!
  // return [...new Set(arr)];
};

console.log(arr.unique()); // (4) [3, 6, 5, 9]

// NOTE: BUT TOTALLY IS NOT A GOOD IDEA TO USE THIS CUSTOMIZED PROTOTYPE PROPERTY

// Let's take a look at h1 DOM Element:
const h1 = document.querySelector("h1");

console.dir(h1);
// We see a huge Prototype Chain here:
// [[Prototype]]: HTMLHeadingElement => [[Prototype]]: HTMLElement => [[Prototype]]: Element =>
// [[Prototype]]: Node => [[Prototype]]: EventTarget => [[Prototype]]: Object

// Let's just have some random functions:
// The function itself is an object and therefore it has a prototype and this prototype contains the methods which we have use already on the functions such as apply, bind and call!

// and that's why we can call the methods on the functions, because functions are objects and objects have prototypes and in this case => function prototypes such as apply, bind and call!
console.dir((x) => x + 1);

// NOTE: WE HAVE PROTOTYPE ON THE OBJECTS AND BECAUSE OF ARRAYS AND FUNCTIONS ARE OBJECT TOO AND OBJECTS HAVE THE PROTOTYPE, THEREFOR, WE CAN CALL THE METHODS ON THE FUNCTIONS AND THE ARRAYS!
