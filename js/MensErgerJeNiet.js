// Naam van Rode Speler
const nameRedPlayer = document.querySelector(".add-RedPlayer");
const playerRedName = document.querySelector(".redplayer-name");
nameRedPlayer.addEventListener("click", function () {
  const redPlayer = prompt("Rode Speler Naam?");
  console.log(redPlayer);
  playerRedName.innerHTML = `<h3 class="player-name">${redPlayer}</h3>`;
  if ((this.disabled = true)) {
    document.querySelector(".add-RedPlayer").style.color = "red";
  }
});
// Naam van Groene Speler
const nameGreenPlayer = document.querySelector(".add-GreenPlayer");
const playerGreenName = document.querySelector(".greenplayer-name");
nameGreenPlayer.addEventListener("click", function () {
  const greenPlayer = prompt("Groene Speler Naam?");
  console.log(greenPlayer);
  playerGreenName.innerHTML = `<h3 class="player-name">${greenPlayer}</h3>`;
  if ((this.disabled = true)) {
    document.querySelector(".add-GreenPlayer").style.color = "green";
  }
});
// Naam van Blauwe Speler
const nameBluePlayer = document.querySelector(".add-BluePlayer");
const playerBlueName = document.querySelector(".blueplayer-name");
nameBluePlayer.addEventListener("click", function () {
  const bluePlayer = prompt("Blauwe Speler Naam?");
  console.log(bluePlayer);
  playerBlueName.innerHTML = `<h3 class="player-name">${bluePlayer}</h3>`;
  if ((this.disabled = true)) {
    document.querySelector(".add-BluePlayer").style.color = "blue";
  }
});
// Naam van Gele Speler
const nameYellowPlayer = document.querySelector(".add-YellowPlayer");
const playerYellowName = document.querySelector(".yellowplayer-name");
nameYellowPlayer.addEventListener("click", function () {
  const yellowPlayer = prompt("Gele Speler Naam?");
  console.log(yellowPlayer);
  playerYellowName.innerHTML = `<h3 class="player-name">${yellowPlayer}</h3>`;
  if ((this.disabled = true)) {
    document.querySelector(".add-YellowPlayer").style.color = "yellow";
  }
});
const dices = document.querySelectorAll('.dice');
const p1Dice = document.querySelector('#p1-dice');
const redsMoveToken = document.querySelector('#redPlayerToken');
const bluesMoveToken = document.querySelector('#bluePlayerToken');
const greensMoveToken = document.querySelector('#greenPlayerToken');
const yellowsMoveToken = document.querySelector('#yellowPlayerToken');
const home = document.querySelector('#home');
const diceValue = document.querySelector('.roll-value');
const redToken = document.querySelectorAll('.redToken');
const blueToken = document.querySelectorAll('.blueToken');
const greenToken = document.querySelectorAll('.greenToken');
const yellowToken = document.querySelectorAll('.yellowToken');
const redHome = document.querySelector('#redHome');
const greenHome = document.querySelector('#greenHome');
const blueHome = document.querySelector('#blueHome');
const yellowHome = document.querySelector('#yellowHome');
const cubePath= document.querySelectorAll('.cube-move-spot');
const redStartSpot = document.querySelectorAll('.redPath0');
const blueStartSpot = document.querySelectorAll('.bluePath0');
const greenStartSpot = document.querySelectorAll('.greenPath0');
const yellowStartSpot = document.querySelectorAll('.yellowPath0');

//audio's
const roll = new Audio('assets/Rolling Dice - Sound ! Notification Tone.mp3');
const move = new Audio('assets/Untitled_Project_V1.mp3');
const won = new Audio('assets/won.mp3');
const kill = new Audio('assets/open-hat-snake-100639.mp3');

let playerWons=0;
let redWon=false;
let greenWon=false;
let blueWon=false;
let yellowWon=false;

let won1st = false;
let won2nd = false;
let won3rd = false;

let playerCount;
let redPlaying ;
let greenPlaying ;
let yellowPlaying ;
let bluePlaying ;

let floatToken=0;
let playersMove=0;

let nCanWon;
let theEnd=false;
let homeChance = false;

// om gegevens uit het instellingenvenster te halen met behulp van een dynamische URL
function gettingData(){
    const urlQuries = new URLSearchParams(window.location.search);
    playerCount = +urlQuries.get("nPlaying");
    redPlaying = urlQuries.get("redPlaying")=== "true";
    greenPlaying = urlQuries.get("greenPlaying")=== "true";
    yellowPlaying = urlQuries.get("yellowPlaying")=== "true";
    bluePlaying = urlQuries.get("bluePlaying")=== "true";
    nCanWon = playerCount-1;
    gameloop();
}

gettingData();    
showingTokens();


let   icons = document.querySelectorAll(`.player-container img`);
let diceOutcome;
let Ndice=Array.from(dices);
[Ndice[1], Ndice[2]] = [Ndice[2], Ndice[1]];
[Ndice[2], Ndice[3]] = [Ndice[3], Ndice[2]];


let tokens = [redToken, greenToken,yellowToken, blueToken];


//om token te tonen bij het starten van het spel en notPlaying tokens te verwijderen
function showingTokens(){
    if(!redPlaying){
        redStartSpot.forEach(spot=>{
            spot.innerHTML="";
        })
    }
    else if(!greenPlaying){
        greenStartSpot.forEach(spot=>{
            spot.innerHTML="";
        })
    }
    else if(!yellowPlaying){
        yellowStartSpot.forEach(spot=>{
            spot.innerHTML="";
        })
    }
    else if(!bluePlaying){
        blueStartSpot.forEach(spot=>{
            spot.innerHTML="";
        })
    }
}

//om te wisselen tussen spelers 
function switchPlayer(playersMove){
    return new Promise((resolve,reject) => {
        
        icons.forEach(e => {
            if(e.classList.contains('floating')){
                e.classList.remove('floating');
            } 
            
        });

        switch(playersMove){
            case 1:
                    if(redPlaying&&!redWon){
                        redsMoveToken.classList.add('floating');
                        resolve(playersMove);
                    }else{
                        reject();
                    }
            break;
            case 2:
                if(greenPlaying&&!greenWon){
                    greensMoveToken.classList.add('floating');
                    resolve(playersMove);
                }else{
                    reject();
                }
               
            break;
            case 3:
                if(yellowPlaying&&!yellowWon){
                    yellowsMoveToken.classList.add('floating');
                    resolve(playersMove);
                }else{
                    reject();
                }
                
            break;
            case 4:
                if(bluePlaying&&!blueWon){
                    bluesMoveToken.classList.add('floating');
                    resolve(playersMove);
                }else{
                    reject();
                }
            break;
            
    
        }
       
    })

   
}

//gameLoop om oneindig te herhalen totdat iemand wint
function gameloop(){
  
    switchPlayer(playersMove)

    .then((playersMove)=>{
       return rolling(playersMove);
    })
    .catch(()=>{
        

        try{
            update();
        }catch (error) {
            if (error instanceof TypeError && error.message === "token is not iterable") {
            
              
              playersMove++;
              gameloop();
              
            } else {
              console.error("An unexpected error occurred:", error);
            }
          }
       
    });
   
}

//om een ​​rollende klasse toe te voegen en op EventListener te klikken 
function rolling(playersMove){
    return new Promise((resolve) => {

        Ndice.forEach(dice => {
            if(dice.classList.contains('rolling')){
                dice.classList.remove('rolling');
            }
            
        });
      

          // om de dobbelstenen te gooien op klik 
        Ndice[playersMove-1].addEventListener('click',clickRoll);
        
        resolve();

    })

   

}

//om te klikken en de dobbelstenen te gooien en de dobbelsteenuitvoer van 1 tot 6 te tonen
function clickRoll(){
    roll.play();
    //toevoegen en verwijderen van rollende en klik event
    Ndice[playersMove-1].classList.add('rolling');
    Ndice[playersMove-1].removeEventListener('click',clickRoll);
    //dobbelsteenwaarde verwijderen
    for(let i=0; i<dices.length; i++)
    {
        for (let j = 1; j < 7; j++) {
            if( dices[i].querySelector(`#D${j}`).classList.contains('visible-dice'))
            {
                dices[i].querySelector(`#D${j}`).classList.remove('visible-dice')
            }
        }
    }
    switch(playersMove){
        case 1:
            redsMoveToken.classList.remove('floating');
        break;
        case 2:
            greensMoveToken.classList.remove('floating');
        break;
        case 3:          
            yellowsMoveToken.classList.remove('floating');           
        break;
        case 4:          
            bluesMoveToken.classList.remove('floating');            
        break;  
    }
    

        
    setTimeout(() => {
        const randomInt = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        diceOutcome=randomInt;
        switch(randomInt){
            case 1:
                Ndice[playersMove-1].querySelector('#D1').classList.add('visible-dice');
            break;
            case 2:
                Ndice[playersMove-1].querySelector('#D2').classList.add('visible-dice');
            break;
            case 3:
                Ndice[playersMove-1].querySelector('#D3').classList.add('visible-dice');
            break;
            case 4:
                Ndice[playersMove-1].querySelector('#D4').classList.add('visible-dice');
            break;
            case 5:
                Ndice[playersMove-1].querySelector('#D5').classList.add('visible-dice');
            break;
            case 6:
                Ndice[playersMove-1].querySelector('#D6').classList.add('visible-dice');
            break;
        }
        
        Ndice[playersMove-1].classList.remove('rolling');

        tokenFloat(playersMove);
       
    
    }, 500);  
   
   
}

//om een ​​zwevende klasse aan tokens toe te voegen
let token;
function tokenFloat(playersMove){
        token = tokens[playersMove-1];
        let skipMove=true;
        token.forEach(t => {

            
            if(t.parentElement.classList.contains("disks")||t.parentElement.classList.contains("tokenHome")){
                if(t.parentElement.classList.contains("disks")){
                    if(diceOutcome==6){
                        skipMove=false;
                        t.classList.add('floating');
                        t.addEventListener('click',openToken);
                    }
                }     
            }else{
                //om te controleren en een zet over te slaan als de dobbelsteenwaarde groter is dan de resterende plekken
                let cureentSpotRed, cureentSpotGreen, cureentSpotYellow, cureentSpotBlue;
                switch(playersMove){
                    case 1:
                        let matchingClassRed = [...t.parentNode.classList].find(className => className.startsWith("redPath"));
                         cureentSpotRed=parseInt(matchingClassRed.substring(7));
                    break;
                    case 2:
                        let matchingClassGreen = [...t.parentNode.classList].find(className => className.startsWith("greenPath"));
                         cureentSpotGreen=parseInt(matchingClassGreen.substring(9));
                    break;
                    case 3:          
                        let matchingClassYellow = [...t.parentNode.classList].find(className => className.startsWith("yellowPath"));  
                         cureentSpotYellow=parseInt(matchingClassYellow.substring(10));     
                    break;
                    case 4:          
                        let matchingClassBlue = [...t.parentNode.classList].find(className => className.startsWith("bluePath"));    
                         cureentSpotBlue=parseInt(matchingClassBlue.substring(8));                 
                    break;  
                }
               
                let canMoveRed=cureentSpotRed+diceOutcome+1;
                let canMoveGreen=cureentSpotGreen+diceOutcome+1;
                let canMoveYellow=cureentSpotYellow+diceOutcome+1;
                let canMoveBlue=cureentSpotBlue+diceOutcome+1;

                if(canMoveRed<=58){
                    skipMove=false;
                    t.classList.add('floating');
                    t.addEventListener('click',moveToken);
                }
                else if(canMoveGreen<=58){
                    skipMove=false;
                    t.classList.add('floating');
                    t.addEventListener('click',moveToken);
                }
                else if(canMoveYellow<=58){
                    skipMove=false;
                    t.classList.add('floating');
                    t.addEventListener('click',moveToken);
                }
                else if(canMoveBlue<=58){
                    skipMove=false;
                    t.classList.add('floating');
                    t.addEventListener('click',moveToken);
                }

                
            } 
             
        });
        canAutoPlay(token);
        //om een ​​zet over te slaan als er geen token verplaatst kan worden
        if(skipMove){
            update();
        } 
}

//om te controleren of het token automatisch kan worden verplaatst
function canAutoPlay(token){
    token.forEach(t=>{
        if(t.classList.contains('floating')){
            floatToken++;
        }
    })
    console.log("float token value ", floatToken);
    if(floatToken==1){
        autoPlay(token);
    }
    floatToken=0;
}

//het token automatisch verplaatsen 
function autoPlay(token){
   token.forEach(t=>{
    if(t.classList.contains('floating')){
        t.click();
    }
   })
}

//om extra kansen te krijgen als je 6 krijgt
function extraChance() {
    for (const t of token) {
        if (diceOutcome === 6 && t.classList.contains('floating')) {
            return true;
        }
    }
    return false;
}
//om een ​​nieuw token te openen
function openToken(){

    let path;
    let Token = document.querySelector(`#${this.id}`);
    
    tokens[playersMove-1].forEach(t => {
        t.removeEventListener('click',openToken);
    });
    //voor meer dan één token op de spot
    cubePath.forEach(path => {
        let images=path.querySelectorAll('img');
        if (images.length > 4) {
                path.classList.add("makeGrid2");
        }else if(images.length > 1){
                path.classList.add("makeGrid");
        }
    });
    
    
    switch(playersMove){
        case 1:
             path=document.querySelector(`.redPath1`);
            path.appendChild(Token);
        break;
        case 2:
             path=document.querySelector(`.greenPath1`);
            path.appendChild(Token);
        break;
        case 3:          
            path=document.querySelector(`.yellowPath1`);
            path.appendChild(Token);     
        break;
        case 4:          
            path=document.querySelector(`.bluePath1`);
            path.appendChild(Token);                 
        break;  
    }
    move.play();
    update();
}
//om een ​​token te verplaatsen de waarde van de dobbelstenen
function moveToken(){
    let tokenId=this.id;
    let i;
    switch(playersMove){
        case 1:
            let matchingClassRed = [...this.parentNode.classList].find(className => className.startsWith("redPath"));
             i=parseInt(matchingClassRed.substring(7));
        break;
        case 2:
            let matchingClassGreen = [...this.parentNode.classList].find(className => className.startsWith("greenPath"));
             i=parseInt(matchingClassGreen.substring(9));
        break;
        case 3:          
            let matchingClassYellow = [...this.parentNode.classList].find(className => className.startsWith("yellowPath"));  
            i=parseInt(matchingClassYellow.substring(10));     
        break;
        case 4:          
            let matchingClassBlue = [...this.parentNode.classList].find(className => className.startsWith("bluePath"));    
            i=parseInt(matchingClassBlue.substring(8));                 
        break;  
    }

        //om het volgende pad te krijgen en het token naar dat pad te verplaatsen 
        function movingToken(diceOutcome){
            
            i++;
            diceOutcome--;
            
            let path;
            switch(playersMove){
                case 1:
                     path = document.querySelector(`.redPath${i}`);
                break;
                case 2:
                     path = document.querySelector(`.greenPath${i}`);
                break;
                case 3:          
                     path = document.querySelector(`.yellowPath${i}`);           
                break;
                case 4:          
                     path = document.querySelector(`.bluePath${i}`);                     
                break;  
            }
    
                //token selecteren en verplaatsen naar het volgende pad
                let Token = document.querySelector(`#${tokenId}`);
                //om de grid klasse voor meerdere tokens te verwijderen
                cubePath.forEach(path => {
                    let images=path.querySelectorAll('img');
                    if (images.length > 4) {
                             path.classList.remove("makeGrid2");
                    }else if(images.length > 1){
                             path.classList.remove("makeGrid");
                    }
                });
                console.log('sound activatd',move);
                move.play();
                path.appendChild(Token);
                
                //om een ​​grid klasse toe te voegen voor meerdere tokens 
                cubePath.forEach(path => {
                    let images=path.querySelectorAll('img');
                    if (images.length > 4) {
                            path.classList.add("makeGrid2");
                    }else if(images.length > 1){
                        path.classList.add("makeGrid");
                    }
                });
                
                //om de recursieve functie te verlaten door de volgende functie update aan te roepen om de spelerzet bij te werken.
                if(diceOutcome==0){
                    //om te controleren of de dobbelsteen thuis is, en zo ja, geef hem dan een extra kans 
                    if (path.classList.contains("tokenHome")&&path.querySelectorAll('img').length<4) {
                        homeChance = true;
                        update();
                    } else {
                        console.log(path.classList);
                        // Indien niet, controleer dan of het bestand moet worden gedood 
                        killToken(Token, path);
                    }
                }else{
                    setTimeout(() => {
                       
                        movingToken(diceOutcome);
                    }, 300);
                }
    
           
        }
        //recursief aanroepen totdat de dobbelsteenwaarde niet nul is
        movingToken(diceOutcome);
   
}
let killed=false;
// om de tokens te doden
function killToken(Token,path){
   
    if(!(path.classList.contains('star-place')||path.classList.contains("tokenStart"))){
       
        let tokenName=Token.name;
        let tokensInPath=path.querySelectorAll('img');
    
     //om door alle tokens op een specifieke plek te gaan
     tokensInPath.forEach(t => {
        let otherTokenName=t.name;
        let homeSpot;
        // om ongelijksoortige tokens te doden, alleen niet dezelfde token
        if(tokenName!=otherTokenName){
            killed=true;
            // thuiskomen voor het token dat gedood gaat worden
            switch (otherTokenName) {
                case "redToken":
                       homeSpot = document.querySelectorAll(".redPath0");
                       
                break;
                case "greenToken":
                        homeSpot = document.querySelectorAll(".greenPath0");
                break;
                case "yellowToken":
                        homeSpot = document.querySelectorAll(".yellowPath0");
                break;
                case "blueToken":
                        homeSpot = document.querySelectorAll(".bluePath0");
                break;

            }
            //converteren naar array om eenvoudig te kunnen doorkruisen 
            let homeSpotCollection = [...homeSpot];
            
            //om alle andere tokens alleen binnen de spot te selecteren
            let elementsToCheck = path.querySelectorAll(`[name ="${otherTokenName}"]`);
            if (elementsToCheck.length > 0){
                killedToken=elementsToCheck[0];
            }
            //controleren en toevoegen van de otherToken in de lege startpagina
            homeSpotCollection.forEach(s => {
                let hasToken = s.querySelector('img') !==null;
                if(!hasToken){
                    kill.play();
                    s.appendChild(killedToken);
                }
            });
        }
        else{
           
            
            
        }
    });
    }
    
     
        update();
    
    
}
//om te controleren of een speler gewonnen heeft of niet 
function isWon(){

    if(redHome.querySelectorAll('img').length==4){
        if(!redWon){
            redWon=true;
            playerWons++;
            return ".p1";
        }
    }

    if(greenHome.querySelectorAll('img').length==4){
        if(!greenWon){
            greenWon=true;
            playerWons++;
            return ".p2";
        }
    }
    if(blueHome.querySelectorAll('img').length==4){
        if(!blueWon){
            blueWon=true;
            playerWons++;
            return ".p3";
        }
        
    }

    if(yellowHome.querySelectorAll('img').length==4){
        if(!yellowWon){
            yellowWon=true;
            playerWons++;
            return ".p4";
        }
    }
    
}
// om gewonnen kroon te tonen met betrekking tot positie
function showWon(wonPlayerClass){
    
    let showSpot = document.querySelector(wonPlayerClass);
    // controleer welke speler op welke positie heeft gewonnen
        switch(playerWons){
            case 1:
               if(!won1st){
                showSpot.style.display="flex";
                showSpot.innerHTML='<img src="img/Won1st.png" alt="1st won" width="100%" >';
                won.play();
                won1st=true;
               }
                
                
            break;
            case 2:
                if(!won2nd){
                    showSpot.style.display="flex";
                    showSpot.innerHTML='<img src="img/Won2nd.png" alt="1st won" width="100%" >';
                    won2nd=true;
                    won.play();
                }
            break;
            case 3:
                if(!won3rd){
                    showSpot.style.display="flex";
                    showSpot.innerHTML='<img src="img/Won3rd.png" alt="1st won" width="100%" >';
                    won3rd=true;
                    won.play();
                }
            break;
        }
      
}
//om het spel te beëindigen en de verliezer tot verliezer te maken
function gameEnds(){
    console.log("game ends");
    theEnd=true;

    if(redPlaying&&!redWon){

        let looser = document.querySelector('.p1');
        looser.style.display="flex";
        looser.innerHTML='<img src="img/looser.png" alt="1st won" width="100%" >';
    }
    if(greenPlaying&&!greenWon){
        let looser = document.querySelector('.p2');
        looser.style.display="flex";
        looser.innerHTML='<img src="img/looser.png" alt="1st won" width="100%" >';
    }
    if(yellowPlaying&&!yellowWon){
        let looser = document.querySelector('.p4');
        looser.style.display="flex";
        looser.innerHTML='<img src="img/looser.png" alt="1st won" width="100%" >';
    }
    if(bluePlaying&&!blueWon){
        let looser = document.querySelector('.p3');
        looser.style.display="flex";
        looser.innerHTML='<img src="img/looser.png" alt="1st won" width="100%" >';
    }
    
}

//om de spelerbeweging bij te werken
function update(){
    if(playerWons==nCanWon){
       gameEnds();
    }
        if(extraChance()||killed||homeChance){
            if(playerWons==nCanWon){
                gameEnds();
             }
            killed=false;
            homeChance=false;
            playersMove=playersMove;
        }else{
            
            //spelers verhogen en resetten Ga naar playersMove tussen 4 spelers 
                if(playersMove===4){
                    playersMove=1;
                
                }else{
                    playersMove++;
                    
                }
        }
    
    //klasse krijgen van zijn startplek en controleren of gewonnen
    let wonPlayerClass=isWon();
        // als een speler wint, dan de kroon laten zien 
        if(redWon||blueWon||greenWon||yellowWon){
            showWon(wonPlayerClass);
        }
    
    //om een ​​raster te maken om meer dan één token op één plaats toe te voegen
    cubePath.forEach(path => {
        let images=path.querySelectorAll('img');
        if(images.length > 4) {
                path.classList.add("makeGrid2");
        }else if(images.length > 1){
            path.classList.add("makeGrid");
        }
        else{
            path.classList.remove("makeGrid");
            path.classList.remove("makeGrid2");
        }
    });
    

    
    // het verwijderen van de zwevende klasse en de bijbehorende klikgebeurtenis
        token.forEach(t => {
            t.classList.remove('floating');
            t.removeEventListener('click',moveToken);
            t.removeEventListener('click',openToken);
            
        });
    if(!theEnd){
        gameloop();
    }   
}

