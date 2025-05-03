let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let leaderboard = { X: 0, O: 0 };

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.querySelectorAll(".cell")[index].innerText = currentPlayer;
        document.querySelectorAll(".cell")[index].classList.add(currentPlayer.toLowerCase());

        if (checkWin()) {
            displayWinner(currentPlayer);
        } else if (board.every(cell => cell !== "")) {
            displayDraw(); 
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function displayWinner(winner) {
    gameActive = false;
    leaderboard[winner]++;
    updateLeaderboard();
        
    const winnerPopup = document.getElementById("winner-popup");
    const winnerText = document.getElementById("winner-text");
    winnerText.innerText = `${winner} wins!`;
    winnerPopup.style.display = "flex"; 

    setTimeout(() => {
        winnerPopup.style.display = "none"; 
        startNewGame();
        currentPlayer = winner === "X" ? "O" : "X";  
    }, 2000); // 
}

function displayDraw() {
    gameActive = false;

    const drawPopup = document.getElementById("draw-popup");
    const drawText = document.getElementById("draw-text");
    drawText.innerText = "It's a draw!";
    drawPopup.style.display = "flex"; 

    setTimeout(() => {
        drawPopup.style.display = "none"; 
        startNewGame();
    }, 2000); 
}

function startNewGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("x", "o");
    });
    document.getElementById("winner-message").innerText = "";
}
    
function resetGame() {
    leaderboard = { X: 0, O: 0 };
    updateLeaderboard();
    startNewGame();
    document.getElementById("reset-button").style.display = "none"; 
}

function updateLeaderboard() {
    document.getElementById("scoreX").innerText = leaderboard.X;
    document.getElementById("scoreO").innerText = leaderboard.O;
}

