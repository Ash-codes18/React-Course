import { useState } from 'react';
import Player from './components/player';
import Board from './components/Board'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './components/winning';
import GameOver from './components/gameOver';

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

function deriveGameBoard(gameTurns){
  
  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square; 

      gameBoard[row][col] = player;
  }

  return gameBoard;
}


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0){
    currentPlayer = gameTurns[0].player === 'X' ? 'O' : 'X';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard,players){
  let winner;

  for(const combinations of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquare = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquare = gameBoard[combinations[2].row][combinations[2].column];
 

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
      winner = players[firstSquare];
    }
  }

  return winner;
}


function App() {
  
  const [players,setPlayers] = useState(PLAYERS);

  const nameChangeHandler= (symbol, newName) => {
    setPlayers((prevPlayers) => { 
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const Drawn = gameTurns.length === 9 && !winner;


  function handleSelectCell(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const newTurns = [
        { square : {row : rowIndex, col: colIndex}, player : currentPlayer},
          ...prevTurns 
      ];
      return newTurns;
    })
  }

  function handleRematch(){
    setGameTurns([]);
  }

  return (
    <>
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
          name={players.X} 
          symbol="X" 
          isActive={activePlayer==='X'}
          onNameChange={nameChangeHandler} 
          />
        <Player 
          name={players.O}
          symbol="O" 
          isActive={activePlayer==='O'}
          onNameChange={nameChangeHandler} 
          />
      </ol>

      {(winner || Drawn) && <GameOver winner={winner} rematch={handleRematch}/>}

      <Board onSelectCell={handleSelectCell} board={gameBoard}/>
      </div>

      <Log turns={gameTurns}/>
    </>
  )
}

export default App
