document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-btn');
    const scoreCard = document.getElementById('score-card');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let moves = 0;
    let xWins = 0;
    let oWins = 0;

    // Create the Tic-Tac-Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    // Handle cell click event
    function handleCellClick(event) {
        const index = event.target.getAttribute('data-index');

        if (gameBoard[index] === '' && moves < 9) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add(currentPlayer.toLowerCase()); // Add class for X or O styling
            moves++;

            if (checkWin()) {
                showWinner();
                updateScore();
                resetBoard();
            } else if (moves === 9) {
                announceDraw();
                resetBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Check for a win
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    // Show the winner and update the score
    function showWinner() {
        alert(`Player ${currentPlayer} wins!`);
        currentPlayer === 'X' ? xWins++ : oWins++;
        updateScore();
        if (xWins >= 3 || oWins >= 3) {
            promptNewGame();
        }
    }

    // Announce a draw
    function announceDraw() {
        alert('It\'s a draw!');
    }

    // Prompt for a new game after 3 wins
    function promptNewGame() {
        const response = confirm('Do you want to start a new game?');
        if (response) {
            xWins = 0;
            oWins = 0;
            updateScore();
            resetBoard();
        }
    }

    // Update and display the score
    function updateScore() {
        scoreCard.textContent = `Score - X: ${xWins} | O: ${oWins}`;
    }

    // Reset the game board
    function resetBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        moves = 0;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o'); // Remove X and O styling classes
        });
    }

    // Reset the game and score
    resetBtn.addEventListener('click', () => {
        xWins = 0;
        oWins = 0;
        updateScore();
        resetBoard();
    });
});
