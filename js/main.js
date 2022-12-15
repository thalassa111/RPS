let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
console.log("graphics.js");
import { number } from "./number.js";

let lastTime = Date.now();
let deltaTime = 0;
let numberArray = [];
let numberArray2 = [];
let numberArray3 = [];
let speedOfNumber = 500;
let speedOfNumbers = [500, 500, 500];
let choiceMade = false;
let playerPick;
let updateFrames = true;
let isGameOn = false;

function init(){
    numberArray = [];
    numberArray2 = [];
    numberArray3 = [];
    lastTime = Date.now();
    deltaTime = 0;
    choiceMade = false;
    speedOfNumber = 400;
    updateFrames = true;
    startButtonAnimation();
    isGameOn = true;
    moveToHistory();
    generateHands(numberArray);
    generateHands(numberArray2);
    generateHands(numberArray3);
}

function generateHands(inArray){
    for(let i=0; i<11; i++){
        let tmp = new number(50 * i, generateRandomImg());
        inArray.push(tmp);
    }
}

window.newGame = function(){
    init();
    draw();
}

window.showBox = function(inID){
    let ID = document.getElementById(inID);
    if(ID.hidden){
        ID.hidden = false;
    }
    else{
        ID.hidden = true;
    }
}

function moveToHistory(){
/*     swap("history4", "history1");
    swap("history5", "history2");
    swap("history6", "history3"); */
    swap("history1", "line1");
    clear("line1");
    swap("history2", "line2");
    clear("line2");
    swap("history3", "line3");
    clear("line3");
/*     console.log("movetohistory"); */
}

function swap(inHistory, inline){
    document.getElementById(inHistory).innerHTML = document.getElementById(inline).innerHTML;
}

function clear(inline){
    document.getElementById(inline).innerHTML = "";
}

function getImg(inArg){
    return document.getElementById(inArg);
}

function generateRandomImg(){
    return Math.floor(Math.random() * 3);
}

function draw(){
    let currentTime = Date.now();
    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if(choiceMade === true && speedOfNumber > 0)
    {
        speedOfNumber -= 1;
        if(speedOfNumber <= 0){
            pickWinner(numberArray3, "line1");
            pickWinner(numberArray2, "line2");
            pickWinner(numberArray, "line3");
            updateFrames = false;
            isGameOn = false;
        }
    }
    /* console.log("speedOfNumber: " + speedOfNumber);  */
    drawHands(numberArray, canvas.width - 50, 1, true); //last parameter for rolling up or down
    drawHands(numberArray2, 75, false);
    drawHands(numberArray3, 0, true);

    drawPickline();

    if(updateFrames){
    requestAnimationFrame(draw);
    }
}

function drawHands(inArray, xPos, directionDown){
    if(directionDown){  //rolling down
        for(let i=0; i<inArray.length; i++){
            context.drawImage(getImg("img" + inArray[i].imgNumber), xPos, inArray[i].y += deltaTime * speedOfNumber, 50, 50);
            if(inArray[i].y > canvas.height )
            {
                inArray.pop();
                let tmp = new number(-50, generateRandomImg());
                inArray.unshift(tmp);
            }
        }
    }
    else{   //rolling up
        for(let i=0; i<inArray.length; i++){
            context.drawImage(getImg("img" + inArray[i].imgNumber), xPos, inArray[i].y -= deltaTime * speedOfNumber, 50, 50);
            if(inArray[i].y < -50)
            {
                inArray.shift();
                let tmp = new number(canvas.height, generateRandomImg());
                inArray.push(tmp);
            }
        }
    }

/*     for(let i=0; i<inArray.length; i++){     //draw redline for debugging
        context.beginPath();
        context.moveTo(0, inArray[i].y);
        context.lineTo(canvas.width, inArray[i].y);
        context.strokeStyle = "#ff0000";
        context.stroke();
    } */
}

function drawPickline(){
    context.beginPath();
    context.moveTo(0, (canvas.height / 2));
    context.lineTo(canvas.width, (canvas.height / 2));
    context.strokeStyle = "#ffff00";
    context.stroke();
}

function AiPick(inArray){
    let thePick;
    for(let i=0; i<inArray.length; i++){
        if(inArray[i].y < (canvas.height / 2) && (inArray[i].y) + 50 > canvas.height / 2){
            thePick = inArray[i].imgNumber;
            //console.log("thePick: " + thePick);
        }
    }
    return thePick;
}

function pickWinner(inArray, id){
    let AInumber = AiPick(inArray);
    let result = document.getElementById(id);
    console.log("player: " + playerPick + " Ainumber: " + AInumber);
    if(playerPick === 0){    //player is rock
        if(playerPick === AInumber){result.innerHTML = id + " - draw ";}
        else if(AInumber === 1){result.innerHTML = id + " - loss ";}
        else{result.innerHTML = id + " - win ";}
        return;
    }
    if(playerPick === 1){    //player is paper
        if(playerPick === AInumber){result.innerHTML = id + " - draw ";}
        else if(AInumber === 2){result.innerHTML = id + " - loss ";}
        else{result.innerHTML = id + " - win ";}
        return;
    }
    if(playerPick === 2){    //player is scissor
        if(playerPick === AInumber){result.innerHTML = id + " - draw ";}
        else if(AInumber === 0){result.innerHTML = id + " - loss ";}
        else{result.innerHTML = id + " - win ";}
        return;
    }
}

window.logic = function(inArg){
    if(isGameOn){
        choiceMade = true;
        playerPick = inArg;
        stopButtonAnimation();
        startBlinkingButton(inArg);
    }
}

function stopButtonAnimation(){
    let element = document.getElementsByClassName("button");
    for(let i=0; i<element.length; i++){
        element[i].style.animation = "paused";
    }
}

function startButtonAnimation(){
    let element = document.getElementsByClassName("button");
    for(let i=0; i<element.length; i++){
        element[i].style.animation = "pulse 0.8s infinite";
    }
}

function startBlinkingButton(inArg){
    let element = document.getElementsByClassName("button");
    element[inArg].style.animation = "blinkingButton 1.2s infinite";
}

console.log("running main.js");