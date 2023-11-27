document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    const resetButton = document.getElementById("reset-button");

    // Function to create puzzle pieces with random arrangement
    function createRandomArrangement() {
        const numbers = [...Array(8).keys()].map(i => i + 1);
        numbers.push(""); // Add an empty space
        return numbers.sort(() => Math.random() - 0.5); // Shuffle the numbers
    }

    let currentArrangement = createRandomArrangement();

    // Function to create puzzle pieces
    function createPuzzle() {
        puzzleContainer.innerHTML = "";
        currentArrangement.forEach((number, index) => {
            const puzzlePiece = document.createElement("div");
            puzzlePiece.className = "puzzle-piece";
            puzzlePiece.textContent = number || ""; // Display an empty string instead of "0"
            puzzlePiece.addEventListener("click", () => handlePieceClick(index));
            puzzleContainer.appendChild(puzzlePiece);
        });
    }

    // Function to handle puzzle piece click
    function handlePieceClick(index) {
        const emptyIndex = currentArrangement.indexOf("");
        if (isAdjacent(index, emptyIndex)) {
            // Swap the empty space with the clicked puzzle piece
            [currentArrangement[index], currentArrangement[emptyIndex]] = [currentArrangement[emptyIndex], currentArrangement[index]];
            createPuzzle(); // Update the puzzle display
        }
        if (isPuzzleSolved()) {
            showCongratsPopup();
        }
    }

    // Function to check if two pieces are adjacent
    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / 3);
        const col1 = index1 % 3;
        const row2 = Math.floor(index2 / 3);
        const col2 = index2 % 3;

        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }

    // Function to check if the puzzle is solved
    function isPuzzleSolved() {
        return currentArrangement.every((number, index) => number === "" || number === index + 1);
    }

    // Function to reset the game
    function resetGame() {
        currentArrangement = createRandomArrangement();
        createPuzzle();
    }

    // Function to show congratulations popup
    function showCongratsPopup() {
        const congratsPopup = confirm("Congratulations! Game completed!\nDo you want to re-play?");
        if (congratsPopup) {
            resetGame();
        } else {
            // Close the tab if the user chooses to exit
            window.close();
        }
    }

    // Initial puzzle creation
    createPuzzle();

    // Event listener for the reset button
    resetButton.addEventListener("click", resetGame);
});
