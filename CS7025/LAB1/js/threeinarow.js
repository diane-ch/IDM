// by including this, we ensure the javascript is only executed when the HTML is fully loaded
$(document).ready(function() {
    console.log("Ready");

    // ---------------- VARIABLES -----------------

    // will hold the current values on board
    let table = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // will track whose turn it is
    let player = 0;

    // array holding symbols for each player
    const playerSymbols = ['X', 'O'];

    // dimension of cell in pixels
    const cellDim = 150;
    // ensure cells are all equal size
        // This will only select the first row 
        //document.querySelector('td').style.height = cellDim + 'px';
        //document.querySelector('td').style.width = cellDim + 'px';
    let cells = document.querySelectorAll('td');
    for (var i=0; i<cells.length; i++) {
        cells[i].style.height = cellDim + 'px';
        cells[i].style.width = cellDim + 'px';
    }
        
    // the row the user just picked
    let selectedRow = 0;

    // the column the user just picked
    let selectedCol = 0;


    // ------------------- FUNCTIONS -------------------

    function checkForWin() {

        // Check rows for a win
        for (let row = 0; row < 3; row++) {
            if (table[row][0] == table[row][1] && table[row][1] == table[row][2] && table[row][0] != '') {
                return true; // Row win
            }
        }

        // Check columns for a win
        for (let col = 0; col < 3; col++) {
            if (table[0][col] == table[1][col] && table[1][col] == table[2][col] && table[0][col] != '') {
                return true; // Column win
            }
        }

        // Check diagonals for a win
        if ((table[0][0] == table[1][1] && table[1][1] == table[2][2] && table[0][0] != '') ||
            (table[0][2] == table[1][1] && table[1][1] == table[2][0] && table[0][2] != '')) {
            return true; // Diagonal win
        }

        // No win condition found
        return false;
    }


    function sendWinNotification() {
        alert("Player " + playerSymbols[player] + " has won!");
        reset()
    }

    function reset() {
        // reset our javascript
        table = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        // reset our html
        let cells = document.querySelectorAll('td')
        for (var i=0; i<cells.length; i++) {
            $(cells[i]).text('');
        }
    }

    function isFull() {
        // loop through the table variable
        // if we find a blank space, return false
        for (var row=0; row<3; row++){
            for (var col=0; col<3; col++){
                if (table[row][col]==""){
                    return false;
                }
            }
        }
        return true;
    }


    function takeTurn() {
        if (isFree(selectedRow, selectedCol)) {
            table[selectedRow][selectedCol] = playerSymbols[player];
            // change it in the HTML to make it apparent
            var desiredTd = $('#table tr:eq(' + selectedRow + ') td:eq(' + selectedCol + ')');
            desiredTd.html(playerSymbols[player]);
            if (checkForWin()) {
                setTimeout(function() {
                    // execute after a small delay to allow HTML to update
                    sendWinNotification();
                }, 100);                
                
            } else {
                if (isFull()) {
                    alert("The table is full ! Nobody won...");
                    reset();

                } else {
                    // change player
                    if (player == 0) {
                        player = 1;
                    } else if (player == 1) {
                        player = 0;
                    }
                    // change it in the HTML
                    currentPlayer = $('#currentPlayer')
                    currentPlayer.html("Current player : " + playerSymbols[player])
                    // more efficient syntax : 
                        // $('#currentPlayer').html("Current player : " + playerSymbols[player]);

                }
                

            }
          
        } else {
            // do nothing
            console.log("Player needs to choose another cell")
        }

        console.log("Mouse was clicked in the table!");
    }

    function isFree(row, col) {
        if (table[row][col] == "") {
            // console.log("it is empty indeed !")
            return true;
            }        
        return false;
    }


    // ------------------- EVENT LISTENER ---------------

    // when the table is clicked, execute the function 'take turn'
    $('#table').on('click', function(event) {

        // Get the mouse position relative to the clicked element
        var x = event.pageX - $(this).offset().left; 
        var y = event.pageY - $(this).offset().top;

        // Print the mouse position
        console.log('Mouse position - X: ', x, ', Y: ', y);

        // Tells which row or column is selected
        selectedRow = Math.floor(y / cellDim);
        selectedCol = Math.floor(x / cellDim);

        console.log('Selected cell - row: ', selectedRow, ', col: ', selectedCol);
        
        takeTurn();
    });

    $('button').on('click', function() {
        reset();
    });





}) // end of loaded ready