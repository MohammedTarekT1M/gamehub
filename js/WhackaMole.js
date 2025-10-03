const cursor = document.querySelector('.cursor'); // Selecteer de aangepaste cursor
let holes = Array.from(document.querySelectorAll('.hole')); // Maak een array van alle gaten (holes) op het bord
const scoreEl = document.querySelector('.scoreboard span'); // Selecteer het score-element in de scoreboard
let score = 0; // Houd de huidige score van de speler bij
let gameOver = false; // Houd bij of het spel voorbij is

const sound = new Audio("assets/whack.mp3"); // Laad het geluidseffect voor wanneer een mol wordt geraakt

// Countdown Timer
const countdownElement = document.querySelector('.countdown'); // Gebruik querySelector om de countdown te selecteren
let timeLeft = 30; // Stel de begintijd in op 30 seconden

// Stel een interval in voor de afteltimer
const countdownTimer = setInterval(() => {
    if (gameOver) {
        clearInterval(countdownTimer); // Stop de timer als het spel is afgelopen
    } else {
        timeLeft--; // Verminder de resterende tijd met 1 seconde
        countdownElement.textContent = timeLeft; // Update de weergave van de timer

        if (timeLeft <= 0) {
            // Als de tijd op is
            clearInterval(countdownTimer); // Stop de timer
            countdownElement.textContent = "Tijd is om!"; // Toon een bericht dat de tijd op is
            gameOver = true; // Stel de status van het spel in op "voorbij"
            alert(`Spel voorbij! Je eindscore is ${score}`); // Toon een pop-up met de eindscore van de speler
        }
    }
}, 1000); // Herhaal elke seconde

function createBoard(size) {
    // Functie om het bord te maken op basis van de gewenste grootte
    const board = document.querySelector('.board'); // Selecteer het spelbord
    board.innerHTML = ''; // Maak het huidige bord leeg (verwijder alle bestaande gaten)

    // Stel de rastergrootte van het bord in op basis van het aantal rijen en kolommen
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // Maak nieuwe gaten (holes) en voeg ze toe aan het bord
    holes = []; // Maak de lijst met gaten leeg
    for (let i = 0; i < size * size; i++) {
        const hole = document.createElement('div'); // Maak een nieuw gat
        hole.classList.add('hole'); // Voeg de class "hole" toe
        board.appendChild(hole); // Voeg het gat toe aan het bord
        holes.push(hole); // Voeg het gat toe aan de array van gaten
    }
}

function updateBoardSize() {
    // Pas de grootte van het bord aan op basis van de score van de speler
    if (score >= 10) {
        createBoard(6); // Maak een 6x6 bord als de score 10 of meer is
    } else if (score >= 8) {
        createBoard(5); // Maak een 5x5 bord als de score 8 of meer is
    } else if (score >= 5) {
        createBoard(4); // Maak een 4x4 bord als de score 5 of meer is
    } else {
        createBoard(3); // Maak een 3x3 bord als standaardgrootte
    }
}

function run() {
    // Start een nieuwe ronde van het spel
    if (gameOver) return; // Stop de functie als het spel voorbij is

    updateBoardSize(); // Pas de grootte van het bord aan op basis van de score

    const i = Math.floor(Math.random() * holes.length); // Kies een willekeurig gat
    const hole = holes[i]; // Selecteer het gekozen gat
    let timer = null; // Timer om de mol na een bepaalde tijd te verwijderen

    const img = document.createElement('img'); // Maak een afbeeldingselement voor de mol
    img.classList.add('mole'); // Voeg de class "mole" toe aan de afbeelding
    img.src = 'img/mole.png'; // Stel de bron van de afbeelding in

    img.addEventListener('click', () => {
        // Voeg een eventlistener toe voor als de mol wordt aangeklikt
        if (gameOver) return; // Stop als het spel voorbij is
        score += 1; // Verhoog de score met 1 punt
        sound.play(); // Speel het geluidseffect af
        scoreEl.textContent = score; // Update de score op het scherm

        clearTimeout(timer); // Annuleer de timer zodat de mol niet wordt verwijderd
        setTimeout(() => {
            if (hole.contains(img)) hole.removeChild(img); // Verwijder de mol na een korte vertraging
            run(); // Start een nieuwe ronde
        }, 500); // Wacht 500 milliseconden
    });

    hole.appendChild(img); // Voeg de mol toe aan het gekozen gat

    timer = setTimeout(() => {
        // Timer om de mol te verwijderen als deze niet wordt aangeklikt
        if (gameOver) return; // Stop als het spel voorbij is
        if (hole.contains(img)) {
            hole.removeChild(img); // Verwijder de mol uit het gat
        }
        run(); // Start een nieuwe ronde
    }, 1500); // Wacht 1500 milliseconden voordat de mol verdwijnt
}

run(); // Start het spel

// Eventlisteners voor de aangepaste cursor
window.addEventListener('mousemove', e => {
    // Beweeg de cursor naar de positie van de muis
    cursor.style.top = e.pageY + 'px'; // Stel de verticale positie in
    cursor.style.left = e.pageX + 'px'; // Stel de horizontale positie in
});

window.addEventListener('mousedown', () => {
    // Voeg een "actieve" stijl toe aan de cursor wanneer de muis wordt ingedrukt
    cursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
    // Verwijder de "actieve" stijl van de cursor wanneer de muis wordt losgelaten
    cursor.classList.remove('active');
});
