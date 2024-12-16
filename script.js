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

console.log("-------------------------ES6 Classes--------------------------");

// Let's implement Person using Class: => Classes are special Type of functions, although we use class keyword here, but behind the scences, classes are still functions, that's why like functions, we have two type of classes: class expression and class declaration:

// class expression => is the same like function but without Paranthesis() and class instead of function:
// const PersonClass = class{}

// class declaration
// class PersonClass {}

// JONAS PREFER TO USE CLASS DECLARATION, BUT I PREFER TO USE FUNCTION EXPRESSION:
const PersonClass = class {
  // First Step: adding a Constructor method: which is similar to the Constructor function that we had already but this constructor is a method of this class and we have to write it exactly as 'constructor' word and pass into that our parameters exactly like Constructor function!
  constructor(fullName, birthYear) {
    this.fullName = fullName; // this keyword points to newly created empty object!
    this.birthYear = birthYear;
  }

  // Method in Constructor function() which recommended to avoid that and use Prototype instead!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };

  // Method in Class() => would be on the Prototype of the Object and not the Object itself => PROTOTYPAL INHERITANCE => exactly like what we had already for constructor function!

  // Instance methods => All the instances have access to them!
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // TO ADD A GETTER FOR AGE PROPERTY => getter here is like the calcAge() method!
  get age() {
    return 2037 - this.birthYear;
  }

  // We can create a setter for the fullname property which will check if this is a fullname or not?
  // Every time we pass a fullName in, this fullName method will set a new name and set it to the _fullName which we later get it from getter. Getter will get the new fullName and return it to the PersonClass and it is assigned to the jessica and we can get the new fullName from jessica.fullName()

  // Set a property that already exists!
  set fullName(fName) {
    fName.includes(" ")
      ? (this._fullName = fName)
      : alert(`${fName} is not a full name!`);
  }

  // creating the getter
  get fullName() {
    return this._fullName;
  }

  // creating a static method inside a class:
  // Static methods are not available on the Instances and sometimes are still useful to implement some kind of helper function about a class or about a constructure function!
  static hey() {
    console.log("Hey there 👋");
    console.log(this);
  }
};

// Exactly like constructor Function, we have to use new keyword and make the new Object(instance)!
// NOTE: When we create a new instance using new keyword, it will call the constructor and a new object is returned and will be stored in jessica.
const jessica = new PersonClass("Jessica Davis", 1990);
console.log(jessica); // PersonClass {firstName: 'Abdol', birthYear: 1990}, we had these Results before using constructor function!

// CALL THE calcAge() Method:
// console.log(jessica.firstName, jessica.birthYear); OR with backtick
console.log(`Full Name: ${jessica.fullName}, BirthYear: ${jessica.birthYear}`); // First Name: Abdol, BirthYear: 1990
jessica.calcAge(); // 47

// Try the getter:
console.log(jessica.age); // 47

// Try the setter:
// jessica.fullName = "Abbas"; // we get the alert message: Abbas is not a full name!
jessica.fullName = "Abbas Akbari"; // This works and we don't get any alert message!
console.log(jessica.fullName);

// Try with new values:
// const walter = new PersonClass("Walter", 1965); // I get this alert: Walter is not a full name!
const walter2 = new PersonClass("Walter white", 1965); // I get this alert: Walter is not a full name!

console.log(walter2.fullName); // Walter white

// CAll the static method:
PersonClass.hey(); // Hey there 👋 and this keyword points to the entire class!

console.log(jessica.__proto__ === PersonClass.prototype); // true

// NOTE: WHAT WE SEE HERE, IS EXACTLY WHAT WE HAD ALREADY IN CONSTRUCTOR FUNCTION, BUT WITH CLASS, IT LOOKS A LITTLE BIT NICER AND WE DON'T NEED TO MANUALLY MASS WITH PROTOTYPE PROPRTY OUTSIDE OF THE CLASS. WE WRITE THE METHOD INSIDE THE CLASS AND OUSIDE OF THE CONSTRUCTOR AND IT WILL BE ADDED AUTOMATICALLY TO THE PROTOTYPE PROPETY OF THE CLASS!

// WE CAN EVEN GO FURTHER WITH THIS DEMONSTRATION => We can add a Method manually to the prototype:

// NOTE: INSTEAD OF WRITING THE BELOW METHOD WITH PROTOTYPE PROPERTY, I CAN JUST WRITE IT AS A STANDALONE METHOD INSIDE THE PERSONCLASS AND OUTSIDE THE CONSTRUCTOR LIKE calcAge() AND WITHOUT comma IN BETWEEN => THAT'S WHY I COMMENT THE FOLLOWING METHOD OUT AND REWRITE IT IN THE PERSONCLASS - ANYWAY, I GET THE SAME RESULT IN BOTH CASES!

// PersonClass.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet(); // Hey Abdol
// We had exactly already the same with Constructor Function => THIS IS ANOTHER PROVE THAT THE CLASS JUST HIDE THE TRUE NATURE OF PROTOTYPE INHERITANCE IN JS!

// SOME MORE POINTS ABOUT THE CLASSES: WE HAVE TO KEEP THESE POINTS IN THE MIND WHEN WE ARE WORKING WITH THE CLASSES:
// 1. Classes are not hoisted, even if they are class Declaration but as we know already, Function Declaration are hoisted, which means we can use them before they are declared, BUT WITH CALSSES IT DOESN'T WORK!

// 2. Like Functions, classes are also first-class citizens => it means we can pass them into a function and we can return them from a function, because classes are actually special kind of functions behind the scences!

// 3. Classes are executed in strict mode! even if we didn't activated strict mode for the entire code, the code inside the body of the class are executed in strict mode!

console.log("---------------Setters and Getters-----------------------------");

// Every Object in JS can have Setters and Getters properties which are the normal functions which gets and sets the values as the name says but they still look like a regular properties:

// const movements = [200, 530, 120, 300];
// console.log(movements[movements.length - 1]);

// We define an Object:
const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  // To create a getter, we write a regular method and then add the get keyword at the beginning of the name of the method => This method will get the latest movement:
  get latest() {
    // return this.movements[this.movements.length - 1]; OR using slice() as following:

    return this.movements.slice(-1).pop(); // slice() gives us an array but we want the value => that's why we use pop() to gives us the value itself!
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // 300 => we don't call the method, but we write it as it is a property!

// for a regular function, we write like this: account.latest(50); but we have setter here and we have to write like following using equal sign:
account.latest = 50;

console.log(account.movements); // (5) [200, 530, 120, 300, 50]

// NOTE: That is how a regular Object works with setter and getter! GETTER AND SETTER WORKS EXACTLY IN THE SAME WAY IN CLASSES!
// LET'S TRY THEM OUT IN OUR PERSON CLASS ABOVE!

console.log("----------------------static Methods--------------------------");

// We had already Array.from() method which convert an array-like structure to a real array!
// For example:
console.log(Array.from(document.querySelectorAll("h1"))); // [h1]

// Array.from() and Number.parseFloat() are static Methods because they are available only on Number or Array Structure and not all the prototypes!

// We can create a static method as following:
Person.hey = function () {
  console.log("Hey there 👋");
  console.log(this); // this keyword points to the entire constructure function(Person Object) here!
};

// And now call this static method!
Person.hey(); // Hey there 👋
// But this a static method and is not inherited like .from in Array.from. we can not call that too on any array! When i call the hey Method on the jonas, it will not work, because it is not in the prototype of jonas object. There is no way that jonas object can inherit it!
// jonas.hey(); // ERROR: jonas.hey is not a function
