const name1 = prompt("Enter name for X ")
const name2 = prompt("Enter name for O ")

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9 ,12],
  [0, 1, 4, 5],
  [2, 3, 6, 7],
  [8, 9, 12, 13],
  [10, 11, 14, 15],
  [4, 5, 8, 9],
  [6, 7, 10, 11],
  [5, 6, 9, 10],
  [1, 2, 5, 6],
  [9, 10, 13, 14]
]

var p1_score=0,p2_score=0

const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = winningMessageElement.querySelector('[data-winning-message-text]')
const cellElements = document.querySelectorAll('[data-cell]')
const restartButton = document.getElementById('restartButton')
const board = document.getElementById('board')
let circleTurn

let value =0;
startGame()


// if(p1_score>p2_score)

//   winningMessageTextElement.innerText = `${name1} Wins!!`
//   else if(p1_score<p2_score)
//   winningMessageTextElement.innerText = `${name1} Wins!!`
//   else
//   winningMessageTextElement.innerText = `DRAW`
//  if(value===1)
//   winningMessageElement.classList.add('show')


restartButton.addEventListener('click', startGame)

function startGame() {
  winningMessageElement.classList.remove('show')
  circleTurn = false
  cellElements.forEach(cell => 
    {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleCellClick)
    cell.addEventListener('click', handleCellClick, { once: true })
   })
  setBoardHoverClass()

  
}

function handleCellClick(e) 
{
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (isWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurn()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) 
  {
    winningMessageTextElement.innerText = 'Draw!'
  } 
  else 
  {
    winningMessageTextElement.innerText = `${circleTurn ? name2 : name1} Wins!!`
 
    
  }
}

function swapTurn() {
  circleTurn = !circleTurn
}

function placeMark(cell, classToAdd) {
  cell.classList.add(classToAdd)
}

function isWin(classToCheck) 
{
  return WINNING_COMBINATIONS.some(combination => 
    {
    return combination.every(index => 
      {
         return cellElements[index].classList.contains(classToCheck)
      })
  })
}

function isDraw() 
{
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) 
  {
    board.classList.add(CIRCLE_CLASS)
  } else 
  {
    board.classList.add(X_CLASS)
  }
} 
