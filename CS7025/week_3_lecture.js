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


for (i=0;i<5;i++){
    console.log("tour numero " + i);
}

let numbers = [34,2,56,8,10]; 
let x;
for (x in numbers) {
console.log("num " + x + " is "+numbers[x]);
}

let hour=14;
hour +=1
let time ="it is " + hour;
console.log(time);

time = 'hello it is ${hour}' // ne marche pas pcq ce n'est pas des guillements normales, mais des "backticks" (pas sur azerty)
console.log(time);