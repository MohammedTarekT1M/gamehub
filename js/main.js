const redPlayer = document.querySelector(".redPlayer");
const greenPlayer = document.querySelector(".greenPlayer");
const yellowPlayer = document.querySelector(".yellowPlayer");
const bluePlayer = document.querySelector(".bluePlayer");
const play = document.querySelector("#play");
const menu = document.querySelector(".startMenu");

const click = new Audio('assets/mixkit-classic-click-1117.wav');
let redPlaying = false;
let greenPlaying = false;
let yellowPlaying = false;
let bluePlaying = false;
let nPlaying = 0;

//selecteren van klikgebeurtenissen
redPlayer.addEventListener('click',slected);
greenPlayer.addEventListener('click',slected);
yellowPlayer.addEventListener('click',slected);
bluePlayer.addEventListener('click',slected);

//om te beginnen met spelen
play.addEventListener('click',startGame);

//om te controleren of er meer dan 2 spelers zijn 
function canPlay(){
    if(nPlaying>=2){
        return true;
    }else{
        return false;
    }
}
//schakelen indien al geselecteerd en vervolgens gedeselecteerd
function slected(){
    click.play();
    let playerId=this.id;
    console.log(playerId);
    let player = document.querySelector(`#${playerId}`);
    if(player.classList.contains("selected")){
        nPlaying--;
        switch(playerId){
            case "redPlayer":
                redPlaying=false;
            break;
            case "bluePlayer":
                bluePlaying=false;
            break;
            case "greenPlayer":
                greenPlaying=false;
            break;
            case "yellowPlayer":
                yellowPlaying=false;
            break;
        }
        player.classList.remove("selected");
        console.log("player deseleted",player);

    }else{
        nPlaying++;
        switch(playerId){
            case "redPlayer":
                redPlaying=true;
            break;
            case "bluePlayer":
                bluePlaying=true;
            break;
            case "greenPlayer":
                greenPlaying=true;
            break;
            case "yellowPlayer":
                yellowPlaying=true;
            break;
        }
        player.classList.add("selected");
        console.log("player seleted",player);
    }
    console.log("n playing ",nPlaying);
}

//dynamische url maken met parameters om gegevens aan het spelbord te geven
function generateUrl(){
    let dynamicUrl =`MensErgerJeNiet.html?nPlaying=${nPlaying}&redPlaying=${redPlaying}&greenPlaying=${greenPlaying}&yellowPlaying=${yellowPlaying}&bluePlaying=${bluePlaying}`;
    return dynamicUrl;
}

function startGame(){
    if(canPlay()){
        click.play();
        menu.style.animation="closing 0.5s linear ";
      setTimeout(() => {
        console.log(" playing game ");
        let dynamicUrl=generateUrl();
        console.log(dynamicUrl);
        window.location.href = dynamicUrl;
      }, 500);
    }else{
        console.log(" select more then 1 player ");
        alert(" select more then 1 player ");
    }
}