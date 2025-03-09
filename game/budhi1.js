const boardElement = document.querySelector('.board');
const statusElement = document.getElementById('status');
const board = Array(9).fill(null);
let currentPlayer = 'player1';
let placedPieces = { player1: 0, player2: 0 };
let selectedCell = null;
let gameOver = false;

function createBoard() {
    boardElement.innerHTML = ''; // Clear the board for restart
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
    updateStatus();
}

function handleCellClick(event) {
    if (gameOver) return; // Prevent further moves after the game is over

    const index = parseInt(event.target.dataset.index);

    if (board[index] === currentPlayer) {
        selectPiece(index);
    } else if (selectedCell !== null && board[index] === null) {
        movePiece(index);
    } else if (board[index] === null && placedPieces[currentPlayer] < 3) {
        placePiece(index);
    }
}

function placePiece(index) {
    board[index] = currentPlayer;
    placedPieces[currentPlayer]++;
    updateBoard();
    checkWinner(); // Check winner after placing a piece
    if (!gameOver) togglePlayer();
}

function movePiece(index) {
    board[selectedCell] = null;
    board[index] = currentPlayer;
    selectedCell = null;
    updateBoard();
    checkWinner(); // Check winner after moving a piece
    if (!gameOver) togglePlayer();
}

function selectPiece(index) {
    if (selectedCell === index) {
        selectedCell = null;
    } else {
        selectedCell = index;
    }
    updateBoard();
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    updateStatus();
}

function updateBoard() {
    board.forEach((value, index) => {
        const cell = boardElement.children[index];
        cell.innerHTML = '';
        cell.classList.remove('selected');
        if (value) {
            const piece = document.createElement('div');
            piece.classList.add('piece', value);
            piece.textContent = value === 'player1' ? 'B' : 'R';
            if (selectedCell === index) {
                cell.classList.add('selected');
            }
            cell.appendChild(piece);
        }
    });
}

function updateStatus() {
    if (!gameOver) {
        statusElement.textContent = `${currentPlayer === 'player1' ? 'BLUE' : 'RED'}'s turn`;
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            showAlert(`${currentPlayer === 'player1' ? 'Blue player' : 'Red player'} wins!`);
            return;
        }
    }

    // Check for a draw
    if (board.every(cell => cell !== null)) {
        gameOver = true;
        showAlert("It's a draw!");
    }
}

function showAlert(message) {
    setTimeout(() => {
        if (confirm(`${message}\nDo you want to restart the game?`)) {
            restartGame();
        }
    }, 100); // Small delay to ensure UI updates before alert
}

function restartGame() {
    // Reset all game variables
    board.fill(null);
    currentPlayer = 'player1';
    placedPieces = { player1: 0, player2: 0 };
    selectedCell = null;
    gameOver = false;

    // Recreate the board and update status
    createBoard();
}

// Initialize the game
createBoard();
/* Ask for names before starting the game
const player1Name = prompt('Enter Player 1 name:');
const player2Name = prompt('Enter Player 2 name:');

document.getElementById('player1').getElementsByTagName('h2')[0].textContent = player1;
document.getElementById('player2').getElementsByTagName('h2')[0].textContent = player2;

startTimer();*/
