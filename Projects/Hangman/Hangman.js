
let wordsList = [];
let blankedWord = [];
let fileRead = false;
let failCount = 0;
let word = "";
let currentOutput;
let guesses = [];

function readFile() {
    var requestURL = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "text"
    request.send();
    request.onload = function() {
        var requestData = request.response;
        formattedData = requestData.split(/\s+/);
        formattedData.forEach(function(word) {
            wordsList.push(word);
        }, this);
    }
    fileRead = true;
}

function randomWordPicker(){
    let min = 0;
    let max = Math.floor(wordsList.length);
    let randomNumber = Math.floor(Math.random() * (max - min + 1));
    return wordsList[randomNumber];
}

function initialOutput(){
    let tempWord = word.split("");
    tempWord.forEach(function(letter) {
        blankedWord.push("__")
    }, this);  
    let output = `
    _______
    |     
    |     
    |   
    |   
    |
    |___________

    ${blankedWord}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}

function updateOutputStage0(){
    let output = `
    _______
    |     
    |     
    |   
    |   
    |
    |___________

    ${blankedWord}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}
function updateOutputStage1(){
    let output = `
    _______
    |     |
    |     
    |   
    |   
    |
    |___________

    ${blankedWord}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}
function updateOutputStage2(){
    let output = `
    _______
    |     |
    |     O
    |   
    |   
    |
    |___________

    ${blankedWord}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}
function updateOutputStage3(){
    let output = `
    _______
    |     |
    |     O
    |     |
    |   
    |
    |___________

    ${blankedWord}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}
function updateOutputStage4(){
    let output = `
    _______
    |     |
    |     O
    |    /|
    |   
    |
    |___________

    ${blankedWord}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}
function updateOutputStage5(){
    let output = `
    _______
    |     |
    |     O
    |    /|\\
    |   
    |
    |___________

    ${blankedWord}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}
function updateOutputStage6(){
    let output = `
    _______
    |     |
    |     O
    |    /|\\
    |    /
    |
    |___________

    ${blankedWord}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}
function updateOutputStage7(){
    let output = `
    _______
    |     |
    |     O
    |    /|\\
    |    / \\
    |    RIP
    |___________
       You Lose
    ${blankedWord}
    Answer: ${word}`;
    document.getElementById("output").value = output;
    currentOutput = output;
}

function guess(){
    let foundLetter = "";
    let count = 0;

    if (document.getElementById("letterGuess").value.length === 1) {
        word.split("").forEach(function(letter) {
            if (letter === document.getElementById("letterGuess").value) {
                foundLetter = letter;
                guesses.push(foundLetter);
            }
            count++;
        }, this);
    }

    if (foundLetter !== "") {
        updateHangman(0);
    }
    else {
        updateHangman(1);
    } 

    if (winCheck()) {        
        alert("CONGRATULATIONS, YOU WIN!!!")
    }
    
    document.getElementById("letterGuess").value = "";
}

function winCheck(){
    let blankedWordString = "";
    blankedWord.forEach(function(tempLetter) {
        if (tempLetter !== "_") {
            blankedWordString = blankedWordString + tempLetter;
        }
    }, this);

    if (blankedWordString === word) {
        return true;
    }
    else{
        return false;
    }
}

function updateHangman(failCountIncrementValue){
    failCount = failCount + failCountIncrementValue;
    switch (failCount) {
        case 0:
            updateOutputStage0();
        break;
        case 1:
            updateOutputStage1();
        break;
        case 2:
            updateOutputStage2();
        break;
        case 3:
            updateOutputStage3();
        break;
        case 4:
            updateOutputStage4();
        break;
        case 5:
            updateOutputStage5();
        break;
        case 6:
            updateOutputStage6();
        break;
        case 7:
            updateOutputStage7();
        break;
        default:
            break;
    }
}

function start(){
    let maxLength;
    if (document.getElementById("header").innerHTML == "Hangman Easy") {
        maxLength = 5;
    }
    else if (document.getElementById("header").innerHTML == "Hangman Medium") {
        maxLength = 9;
    }
    else if (document.getElementById("header").innerHTML == "Hangman Hard") {
        maxLength = 20;
    }

    do {
        newGame();
        console.log(`Word: ${word}`)
    } while (word.length >= maxLength);

}

//chooses new random word and updates the text box
function newGame(){
    document.getElementById("letterGuess").value = "";
    blankedWord.splice(0,blankedWord.length);
    word = randomWordPicker();
    initialOutput();
    failCount = 0;
}

function loadImage(){
    
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function changeHeader(textToAdd){
    document.getElementById("header").innerHTML = `Hangman ${textToAdd}`;
}

//dropdown box functionality
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//reads the file at the start
while (!fileRead) {
    readFile();
}