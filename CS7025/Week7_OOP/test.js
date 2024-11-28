//// how to use classes for my portfolio ? 
// Create a portfolio folder in github, bc what he is most interested in is how i use js for my portfolio

class Person{
    #name;  //making it a private variable

    constructor(name){
        this.#name = name;
    }

    greet() {
        console.log(`Hello ${this.#name}.`);
        
    }
}

let rory = new Person("Rory");
rory.greet();   // works because its within the method is within the class

console.log("name", rory.#name); // the variable name is not accessible from outside the class
