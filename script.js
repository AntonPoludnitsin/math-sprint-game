const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
const countdown = document.getElementById('countdown');
const startForm = document.getElementById('start-form');
const value10 = document.getElementById('value-10');
const value25 = document.getElementById('value-25');
const value50 = document.getElementById('value-50');
const value99 = document.getElementById('value-99');
const itemContainer = document.getElementById('item-container');

let questionAmount;
let equationsArray = [];
let symbol = 'x';
let equationValue;

// Displays 3, 2, 1, GO!
function countdownStart() {
    countdown.innerText = '3'; 
    setTimeout(() => { countdown.innerText = '2' }, 1000);
    setTimeout(() => { countdown.innerText = '1' }, 2000);
    setTimeout(() => { countdown.innerText = 'GO!' }, 3000);
}

// Navigate from Splash Page to CountdownPage to Game Page
function showCountdown() {
    countdownPage.style.display = 'flex';
    splashPage.style.display = 'none';
    populateGamePage();
    countdownStart();
    setTimeout(showGamePage, 4000);
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
    // Set blank space above
    itemContainer.innerHTML = '<div class="item"></div><div class="item"></div><div class="item"></div>';
    // Randomly choose how many correct equations there should be
    correctEquations = getRandomInt(questionAmount);
    // Set amount of wrong equations
    wrongEquations = questionAmount - correctEquations;
    console.log('Correct:', correctEquations);
    // Loop through for each correct equation, multiply random numbers up to 9, push to array
    for (i = 0; i < correctEquations; i++) {
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        equationValue = firstNumber * secondNumber;
        equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
        equationsArray.push(equation);
    }
    // Loop through for each wrong equation, mess with the equation results, push to array
    for (i = 0; i < wrongEquations; i++) {
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        equationValue = firstNumber * secondNumber;
        wrong[0] = `${firstNumber} x ${secondNumber - 1} = ${equationValue}`;
        wrong[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
        wrong[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
        whichWrong = getRandomInt(2);
        equation = wrong[whichWrong];
        console.log('which Wrong',whichWrong);
        console.log('equation', equation);
        equationsArray.push(equation);
    }
    shuffle(equationsArray);
    console.log(equationsArray);
    // Create HTML element for each item in array
    for (i = 0; i < equationsArray.length; i++) {
        itemContainer.innerHTML += `
        <div class="item">
            <h1>${equationsArray[i]}</h1>
        </div>`
    }
}

// Get Random Number up to a certain amount
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Shuffle an Array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// Displays Game Page
function showGamePage() {
    gamePage.style.display = 'block';
    countdownPage.style.display = 'none';
}

// Form that decides amount of Questions
startForm.addEventListener('submit', selectQuestion);
function selectQuestion(e) {
    e.preventDefault();
    questionAmount = getRadioVal(this, 'questions');
    console.log(questionAmount);
    showCountdown();
}

// Get the value from selected radio button
function getRadioVal(form, name) {
    let val;
    let radios = form.elements[name];
    for (i = 0; i < radios.length; i++) {
        if ( radios[i].checked ) { 
            val = radios[i].value; 
            break; 
        }
    }
    return val;
}

// Switch selected input styling
startForm.addEventListener('click', () => {
    if (value10.checked) {
        value10.parentElement.classList.add('selected-label');
        value25.parentElement.classList.remove('selected-label');
        value50.parentElement.classList.remove('selected-label');
        value99.parentElement.classList.remove('selected-label');
    } 
    if (value25.checked) {
        value25.parentElement.classList.add('selected-label');
        value10.parentElement.classList.remove('selected-label');
        value50.parentElement.classList.remove('selected-label');
        value99.parentElement.classList.remove('selected-label');
    } 
    if (value50.checked) {
        value50.parentElement.classList.add('selected-label');
        value10.parentElement.classList.remove('selected-label');
        value25.parentElement.classList.remove('selected-label');
        value99.parentElement.classList.remove('selected-label');
    }   
    if (value99.checked) {
        value99.parentElement.classList.add('selected-label');
        value10.parentElement.classList.remove('selected-label');
        value25.parentElement.classList.remove('selected-label');
        value50.parentElement.classList.remove('selected-label');
    } 
});


