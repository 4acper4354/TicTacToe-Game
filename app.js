const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const restartBtn = document.querySelector("#restartBtn")
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGmae()

function initializeGmae() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    running = true
    statusText.textContent  = `${currentPlayer}'s turn`
}
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")

    if(options[cellIndex] != "" || !running) {
        return;
    }

    options[cellIndex] = currentPlayer
    this.textContent = currentPlayer;
    checkWinner()
}
function changePlayer() {
    currentPlayer == "X" ? currentPlayer = "O" : currentPlayer = "X"
    statusText.textContent = `${currentPlayer}'s turn`
}
function checkWinner() {
    let roundWon = false

    for(let i = 0; i < winConditions.length; i++) {
        const condtion = winConditions[i]
        const CellA = options[condtion[0]]
        const CellB = options[condtion[1]]
        const CellC = options[condtion[2]]

        if(CellA == "" || CellB == "" || CellC == "") {
            continue;
        }
        if(CellA == CellB && CellB == CellC) {
            roundWon = true
            break; 
        }
    }

    if(roundWon) {
        statusText.textContent = `${currentPlayer} wins!`
        running = false
    } else if(!options.includes("")) {
        statusText.textContent = `Draw`
        running = false
    } else {
        changePlayer()
    }

}
restartBtn.addEventListener("click", () => {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => {cell.textContent = ""})
})