const EMPTY_COLOR = "#232323";
const DEFAULT_COLOR = "#3173ec";
const ACTIVE_CLASS = "selected";
const BLOCK_CLASS = "color-block";

const easyBtn = document.querySelector("#easy-btn");
const normalBtn = document.querySelector("#normal-btn");
const hardBtn = document.querySelector("#hard-btn");
const newColorsBtn = document.querySelector("#new-colors-btn");
const message = document.querySelector("#message");
const givenColorLabel = document.querySelector("#given-color");
const gameContainer = document.querySelector("#game-interface .container")

let colors = [];
let colorBlocks = [];
let givenColor;
let gameOver = false;


function generateRandomColor() {
    let color = "rgb(";
    for (let i = 0; i < 3; i++) {
        color += Math.floor(Math.random() * 256) + ", ";
    }
    color = color.slice(0, color.length - 2);
    color += ")";
    return color;
}

function generateColors(numOfColors) {
    colors = [];
    for (let i = 0; i < numOfColors; i++) {
        colors.push(generateRandomColor());
    }
    return colors;
}

function generateBlocks(numOfBlocks) {
    gameContainer.innerHTML = "";
    const colors = generateColors(numOfBlocks);
    colors.forEach((block) => {
        let blockElement = document.createElement("div");
        blockElement.classList.add(BLOCK_CLASS);
        gameContainer.appendChild(blockElement);
        colorBlocks.push(blockElement);
    })

    for (let i = 0; i < numOfBlocks; i++) {
        colorBlocks[i].style.backgroundColor = colors[i];
        colorBlocks[i].style.opacity = "0";
        setTimeout(() => {
            colorBlocks[i].style.opacity = "1";
        }, 100);
        colorBlocks[i].addEventListener("click",function(){
            if(gameOver){ return; }
            if(this.style.backgroundColor === givenColor){
                message.textContent = "Winner!";
                winGame();
            }else{
                message.textContent = "Try Again!";
                this.style.visibility = "hidden";
            }
        });
    }
}

function winGame(){
    colorBoard(givenColor);
    for(let i=0;i<colorBlocks.length;i++){
        colorBlocks[i].style.visibility = "visible";
        colorBlocks[i].style.backgroundColor = givenColor;
    }
    gameOver = true;
}

function colorBoard(color){
    document.querySelector("header").style.backgroundColor = color;
}

function initializeGame() {
    document.body.style.backgroundColor = EMPTY_COLOR;
    easyBtn.classList.add(ACTIVE_CLASS);
    easyBtn.addEventListener("click", selectDifficulty);
    normalBtn.addEventListener("click", selectDifficulty);
    hardBtn.addEventListener("click", selectDifficulty);
    newColorsBtn.addEventListener("click", startNewGame);
}

function selectDifficulty() {
    easyBtn.classList.remove(ACTIVE_CLASS);
    normalBtn.classList.remove(ACTIVE_CLASS);
    hardBtn.classList.remove(ACTIVE_CLASS);
    this.classList.add(ACTIVE_CLASS);
    startNewGame();
}

function startNewGame() {
    message.textContent = "";
    gameOver = false;
    colorBoard(DEFAULT_COLOR);
    //initialize blocks
    colorBlocks = [];
    let numberOfBlocks = 0;
    if (easyBtn.classList.contains(ACTIVE_CLASS)) {
        numberOfBlocks = 3;
    } else if (normalBtn.classList.contains(ACTIVE_CLASS)) {
        numberOfBlocks = 6;
    } else if (hardBtn.classList.contains(ACTIVE_CLASS)) {
        numberOfBlocks = 9;
    }
    generateBlocks(numberOfBlocks);
    //choose a random color
    givenColor = colors[Math.floor(Math.random()*colors.length)];
    givenColorLabel.textContent = givenColor;
}

function main() {
    initializeGame();
    startNewGame();
}


main();