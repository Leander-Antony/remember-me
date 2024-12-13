let level = 1;
let sequence = [];
let playerInput = '';
let memorizationTime = 5000;

const numberDisplay = document.getElementById('number-display');
const playerInputField = document.getElementById('player-input');
const startBtn = document.getElementById('start-btn');
const levelInfo = document.getElementById('level-info');
const gameOverMessage = document.getElementById('game-over-message');
const restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener('click', () => {
    resetGame();
    nextLevel();
    startBtn.style.display = 'none'; 
});

function resetGame() {
    level = 1;
    sequence = [];
    playerInput = '';
    levelInfo.textContent = `Level: ${level}`;
    gameOverMessage.textContent = '';
    playerInputField.value = '';
    playerInputField.style.display = 'none'; 
}


function generateSequence(length) {
    sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(Math.floor(Math.random() * 10)); 
    }
}

function showSequence() {
    numberDisplay.textContent = sequence.join(' ');

    setTimeout(() => {
        numberDisplay.textContent = '';  
        promptPlayer();                  
    }, memorizationTime);
}

function promptPlayer() {
    playerInputField.style.display = 'block';
    playerInputField.focus();

    playerInputField.value = '';

    playerInputField.removeEventListener('keypress', handleKeyPress);

    playerInputField.addEventListener('keypress', handleKeyPress);
}


function handleKeyPress(event) {
    if (event.key === 'Enter') {
        playerInput = playerInputField.value;
        checkPlayerInput();
    }
}

function checkPlayerInput() {
    if (playerInput === sequence.join('')) {
        levelUp();
    } else {
        gameOver();
    }
}


function levelUp() {
    level++;
    levelInfo.textContent = `Level: ${level}`;
    playerInputField.style.display = 'none'; 
    nextLevel();
}


function nextLevel() {
    generateSequence(level + 2); 
    showSequence();
}


function gameOver() {
    gameOverMessage.textContent = `Game Over! You reached Level: ${level}`;
    playerInputField.style.display = 'none';
    numberDisplay.textContent = '';
    restartBtn.style.display = 'block'; 
}

restartBtn.addEventListener('click', () => {
    location.reload();
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();  // Disable right-click
});

document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();  // Disable copy keyboard shortcuts
    }
});
