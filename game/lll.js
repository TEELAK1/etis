document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restartBtn');
    const cells = [];

    let currentPlayer = 'X';
    let isGameActive = true;

    // Initialize the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cells.push(cell);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    // Handle cell click event
    function handleCellClick() {
        if (!isGameActive || this.textContent !== '') return;

        this.textContent = currentPlayer;
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Check game status
    function checkGameStatus() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent) {
                isGameActive = false;
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                alert(`${cells[a].textContent} wins!`);
                return;
            }
        }

        if (!cells.some(cell => cell.textContent === '')) {
            isGameActive = false;
            alert('It\'s a draw!');
        }
    }

    // Restart the game
    restartBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        currentPlayer = 'X';
        isGameActive = true;
    });
});
