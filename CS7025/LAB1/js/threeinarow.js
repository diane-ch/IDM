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
        return false;
    }

    function takeTurn() {
        if (isFree(selectedRow, selectedCol)) {
            table[selectedRow][selectedCol] = playerSymbols[player];
            // change it in the HTML to make it apparent
            var desiredTd = $('#table tr:eq(' + selectedRow + ') td:eq(' + selectedCol + ')');
            desiredTd.html(playerSymbols[player]);
            if (checkForWin()) {
                // end game TO DO
            } else {
                // change player
                if (player == 0) {
                    player = 1;
                } else if (player == 1) {
                    player = 0;
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





}) // end of loaded ready