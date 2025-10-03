const myGrid = document.querySelector('.grid');
const flagsLeft = document.querySelector('#flags-left');
console.log(myGrid);
const result = document.querySelector('#result');
const width = 10 // 10 vierkanten

const reloadButton = document.querySelector(".reload-button");

reloadButton.addEventListener("click", function() {
    window.location.reload();
});

// width x width = 100 omdat width nu 10 is, we loopen ooit 99 keer
// elke keer als we dus loopen wordt er een nieuwe div aangemaakt
// Create Board
let bombAmount = 20;
let squares = [];
let isGameOver = false;
let flags = 0;

function createBoard() {
    flagsLeft.innerHTML = bombAmount;

    // Maak en shuffle het gameArray
    // gecombineerde array,  Maakt een lege array met een lengte gelijk aan bombAmount
    const bombArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * width - bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombArray);

    // Shuffle de array met de Fisher-Yates-methode
    for (let i = gameArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [gameArray[i], gameArray[randomIndex]] = [gameArray[randomIndex], gameArray[i]];
    }

    // Toon de geshuffelde array in de console
    console.log(gameArray);

    // Ik voeg de geshuffelde array toe aan de grid
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.id = i;
        square.classList.add(gameArray[i]); // Ik heb hier de gameArray in plaats van shuffledArray neergezet
        myGrid.appendChild(square);
        squares.push(square); // elke keer wanneer het loopt worden de squares geloopt met de array
        console.log(squares);

        // een addEventListener toevoegen voor elke square
        square.addEventListener('click', function() {
            click(square)
        })

        //Met deze addEventListener voeg je je vlag toe in je grid
        square.addEventListener('contextmenu', function() {
            addFlag(square);
        })
    }

    //Nummers toevoegen in de grid
    for (let i = 0; i < squares.length; i++) {
        let total = 0;
        //linkerkant controleren
        // in het midden kan bijvoorbeeld niet omdat het cijfer te hoog is
        const isLeftEdge = (i % width === 0);
        //ik controleer de rechte kant
        const isRightEdge = (i % width === width - 1);

        console.log(squares);
        //positie van de bommen
        if (squares[i].classList.contains('valid') ) {
            // onderste if statement moet waar zijn
            // als de eerste square een bomb heeft wordt er een bomb toegevoegd, elke links
            if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb') ) total++;
            if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
            //waar je klikt, checkt of er een bom is, zo ja, dan word dit toegevoegd aan de total
            // we willen een specifieke square checken
            if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
            // check welke square het is en aan de linker kant
            if (i > 11 && !isLeftEdge && squares [i - width - 1].classList.contains('bomb')) total++;
            //square checken rechts
            // niet rechts deze keer
            if ( i < 99 && !isRightEdge && squares [i + 1].classList.contains('bomb')) total++;
            // controleer naar beneden en links min breedte minus 1, niet op de linkerrand
            if ( i < 90 && !isLeftEdge && squares[i -1 + width ].classList.contains('bomb')) total++;
            //rechts beneden
            if(i < 88 && !isRightEdge && squares [i + 1 + width].classList.contains('bomb')) total++;

            //direct naar beneden, in de squares
            if( i < 89 && squares[i + width].classList.contains('bomb')) total++;
            squares[i].setAttribute('data', total);
        }
    }
}

createBoard();

// hier voeg ik met rechtermuisknop de vlag
function addFlag(square) {
    if (isGameOver) return 
    //niet contain
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
        if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            flags++
            square.innerHTML = '🚩';
            flagsLeft.innerHTML = bombAmount - flags;
            checkForWin()
        // als we op een vierkant klikken dat al een vlag bevat, gebruiken we dit om de vlag te verwijderen
        } else {
            square.classList.remove('flag')
            flags--
            square.innerHTML = ''
            flagsLeft.innerHTML = bombAmount - flags
        }
    }
}

// click functie
function click(square) {
    if (isGameOver) return; // Stop interactie als het spel voorbij is
    console.log(square);

    if (square.classList.contains('bomb')) {
        GameOver();  
        return;
    }
    
    let total = square.getAttribute('data');
    if (total != 0) {
        if (total == 1) square.classList.add('one');
        if (total == 2) square.classList.add('two');
        if (total == 3) square.classList.add('three');
        if (total == 4) square.classList.add('four');
        square.innerHTML = total;
        return;
    }
    
    checkSquare(square);
    square.classList.add('checked');
}

//controleer aangrenzende vierkanten zodra er op het vierkant is geklikt, dus het wordt uitgebreid
function checkSquare(square) {
    const currentId = parseInt(square.id, 10); // omzetten id naar een getal
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    // uitdraaien
    setTimeout(function () {
        // Controleer links
        if (currentId > 0 && !isLeftEdge) {
            const newSquare = squares[currentId - 1];
            if (newSquare && !newSquare.classList.contains('checked')) {
                click(newSquare);
            }
        }

        // Controleer rechts
        if (currentId < width * width - 1 && !isRightEdge) {
            const newSquare = squares[currentId + 1];
            if (newSquare && !newSquare.classList.contains('checked')) {
                click(newSquare);
            }
        }

        // Controleer boven
        if (currentId >= width) {
            const newSquare = squares[currentId - width];
            if (newSquare && !newSquare.classList.contains('checked')) {
                click(newSquare);
            }
        }

        // Controleer onder
        if (currentId < width * (width - 1)) {
            const newSquare = squares[currentId + width];
            if (newSquare && !newSquare.classList.contains('checked')) {
                click(newSquare);
            }
        }

        // Controleer linksboven
        if (currentId >= width && !isLeftEdge) {
            const newSquare = squares[currentId - width - 1];
            if (newSquare && !newSquare.classList.contains('checked')) {
                click(newSquare);
            }
        }

        // Controleer rechtsboven
        if (currentId >= width && !isRightEdge) {
            const newSquare = squares[currentId - width + 1];
            if (newSquare && !newSquare.classList.contains('checked')) {
                click(newSquare);
            }
        }

        // Controleer linksonder
        if (currentId < width * (width - 1) && !isLeftEdge) {
            const newSquare = squares[currentId + width - 1];
            if (newSquare && !newSquare.classList.contains('checked')) {
                click(newSquare);
            }
        }

        // Controleer rechtsonder
        if (currentId < width * (width - 1) && !isRightEdge) {
            const newSquare = squares[currentId + width + 1];
            if (newSquare && !newSquare.classList.contains('checked')) {
                click(newSquare);
            }
        }
    }, 10);
}


function checkForWin() {
    let matches = 0;

    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
            matches++
        }
        if (matches === bombAmount) {
            result.innerHTML = "Je hebt gewonnen!";
            isGameOver = true;
        }
    }
}




function GameOver() {
    result.innerHTML = 'BOOM! Game Over!';
    isGameOver = true;

    // Toon alle bommen
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('bomb')) {
            squares[i].innerHTML = '💣'; // Toon een bom-icoon
            squares[i].classList.remove('bomb');
            squares[i].classList.add('checked');
        }
    }
}