function which_greeting(time){
    let greeting;
    if (time<10){
        greeting = "good morning";
    } else if (time < 20) {
        greeting = "good day";   
    } else {
        greeting = "good evening";
    }
    return greeting;
}

console.log(which_greeting(11))
console.log(which_greeting(23))

console.log("--------------");

for (i=0;i<5;i++){
    console.log("tour numero " + i);
}

console.log("--------------");

let numbers = [34,2,56,8,10]; 
let x;
for (x in numbers) {
console.log("num " + x + " is "+numbers[x]);
}

console.log("--------------");

function crossLimit(speed, limit){
    if (speed > limit) {
        console.log("You need to slow down.");        
    } else {
        while (speed<limit) {
            console.log("You can accelerate for now");            
            speed += 10;
        }
        console.log("You can't go faster !");
    }
}

crossLimit(30, 82);
crossLimit(63,60);
