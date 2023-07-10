let player;
let playerSpeed = 20;
let obstacleSpeed = 0.25;
let obstacles = [];
let gameArea;
let startButton;
let timer;
let timerId;
let startTime;
let frameCount=0;
window.onload = function() {
    player = document.getElementById('player');
    gameArea = document.getElementById('gameArea');
    startButton = document.getElementById('startButton');
    timer = document.getElementById('timer');
    startButton.addEventListener('click', startGame);
}

function startGame() {
    player.style.left = '0px';
    player.style.top = '250px';
    gameArea.innerHTML = '';
    gameArea.appendChild(player);
    obstacles = [];
    playerSpeed = 2;
    obstacleSpeed = 2;
    timer.textContent = '0';
    startTime = Date.now();
    timerId = setInterval(gameLoop, 2000);
    document.addEventListener('keydown', movePlayer);
}

function gameLoop() {
    if (Math.random() < 0.02) {
        createObstacle();
    }
    moveObstacles();
    checkCollision();
    updateTimer();
    playerSpeed = 2 + Math.floor((Date.now() - startTime) / 60000);
    requestAnimationFrame(gameLoop);
}

if (frameCount % 300 === 0) {
    createObstacle();
}
frameCount++;
setInterval(gameLoop, 1000/30);

function movePlayer(event) {
    if (event.key === 'w' || event.key === 'W') {
        if (parseInt(player.style.top) > 0) {
            player.style.top = parseInt(player.style.top) - playerSpeed * 10 + 'px';
        }
    }
    if (event.key === 's' || event.key === 'S') {
        if (parseInt(player.style.top) < (gameArea.offsetHeight - 50)) {
            player.style.top = parseInt(player.style.top) + playerSpeed * 10 + 'px';
        }
    }
}

function createObstacle() {
    let obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = gameArea.offsetWidth + 'px';
    obstacle.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Rest of the code remains the same

function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        if (parseInt(obstacles[i].style.left) > 0) {
            obstacles[i].style.left = parseInt(obstacles[i].style.left) - obstacleSpeed /2+ 'px';
        } else {
            gameArea.removeChild(obstacles[i]);
            obstacles.splice(i, 1);
        }
    }
}

function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        if (parseInt(obstacles[i].style.left) < 30 && parseInt(obstacles[i].style.left) > 0 &&
            Math.abs(parseInt(obstacles[i].style.top) - parseInt(player.style.top)) < 30) {
            alert('游戏失败请重试。你坚持了 ' + timer.textContent + ' 秒');
            clearInterval(timerId);
            startGame();
        }
    }
}

function updateTimer() {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let minutes = Math.floor(elapsed / 60);
    let seconds = elapsed % 60;
    timer.textContent = minutes + ':' + seconds;
}
document.getElementById("playAgainButton").addEventListener("click", function() {
    // Reset the game here
    document.getElementById("timer").textContent = "00:00";
    // Additional code to reset other game elements if needed
    
    // Refresh the webpage here
    location.reload();
});
