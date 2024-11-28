// ----------- Variables ----------------
let supermarket = "tesco";
let groceries = ["milk", "fruits", "bread", "meat", "vegetables"];
let nb_items = groceries.length;

second_item = groceries[1];
third_item = groceries[2];
console.log(`${second_item} is the second item and ${third_item} is the third one.`)

console.log("The", nb_items, "items are : ", groceries);

// Changing "meat" for "fish" in the groceries list
groceries[3] = "fish";
console.log("The updated groceries list from", supermarket, "is : ", groceries)


// -------- Functions -----------
var playerScore = 0;

function addPlayerScore() {
    playerScore += 1;
}

function showPlayerScore() {
    console.log(`The score of the player is ${playerScore}`);
}

// Score of the player is 0 like we instantiated it
showPlayerScore();

// +1 to the score for five rounds
for (let i=0; i<5; i++) {
    addPlayerScore()
}

// Score of the player is now 5
showPlayerScore();


// --------- Conditions --------

function oddOrEven(playerScore) {
    if (playerScore % 2 == 0) {
        console.log("The player's score is even ! ");
    } else {
        console.log("The player's score is odd !")
    }
}

oddOrEven(playerScore);