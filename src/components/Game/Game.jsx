/* eslint-disable react-hooks/exhaustive-deps */
import "./Game.css"
import logo from "../../assets/logo.svg"
import restartIcon from "../../assets/icon-restart.svg"
import cellsData from "../../assets/cells"
// import {getBestMove} from "../../utils/minimax"

import {X, O} from "../Marks"
import RoundOver from "../RoundOver/RoundOver"

import {useState, useEffect} from "react"

export default function GameOn({player1Mark, setIsGameOn, opponent}) {
	const [cells, setCells] = useState(cellsData) // populate the game board with 3x3 cells
	const [turnFor, setTurnFor] = useState("X") //check whose turn to play (x goes first)
	const [moves, setMoves] = useState({x: [], o: []}) //check who wins, losts or is it tie
	const [isRoundOver, setIsRoundOver] = useState(false) //check if round is over
	const [scoreboard, setScoreboard] = useState({x: 0, o: 0, ties: 0}) //populate scoreboard
	const [winner, setWinner] = useState(null) //get the winner mark and player
	const [restart, setRestart] = useState(false)
	const isHumanTurn = opponent === "player" || turnFor === player1Mark

	const winConditions = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	]

	//prettier-ignore
	function handleTurn(id) {
			//check whose turn to play (x goes first)
			const currentPlayer = turnFor
			setCells((prevCells) => prevCells.map((item) =>
					item.id === id ? {...item, turnIcon: currentPlayer === "X" ? "X" : "O", isHeld: true} : item
				)
			)

			//check who wins, loses or it is tie
			const newMoves = turnFor === "X" ? {...moves, x: [...moves.x, id]} : {...moves, o: [...moves.o, id]}
			setMoves(newMoves)

			const xWon = winConditions.some((condition) => condition.every((num) => newMoves.x.includes(num)))
			const oWon = winConditions.some((condition) => condition.every((num) => newMoves.o.includes(num)))
			const tie = newMoves.x.length + newMoves.o.length === 9
			if (xWon || oWon || tie) setIsRoundOver(true)

			setTurnFor((prev) => (prev === "X" ? "O" : "X"))

			//get the winner mark and player, only one works
			if (xWon && player1Mark === "X") setWinner({mark: "X", message: "Player 1 wins!"})
			if (xWon && player1Mark === "O") setWinner({mark: "X", message: "Player 2 wins"})
			if (oWon && player1Mark === "O") setWinner({mark: "O", message: "Player 1 wins"})
			if (oWon && player1Mark === "X") setWinner({mark: "O", message: "Player 2 wins!"})
			if (tie) setWinner({message: "Round Tied"})
		}

	function handleNextRound() {
		setCells(cellsData)
		setTurnFor("X")
		setIsRoundOver(false)
		setMoves({x: [], o: []})
		setWinner(null)
	}

	// Cpu makes random moves
	useEffect(() => {
		const cpuMark = player1Mark === "X" ? "O" : "X"
		if (opponent === "cpu") {
			if (turnFor === cpuMark && !isRoundOver) {
				const remainingCells = cells.filter((cell) => !cell.isHeld).map((c) => c.id)
				const randomCell = Math.floor(Math.random() * remainingCells.length)
				setTimeout(() => handleTurn(remainingCells[randomCell]), 400)
			}
		}
	}, [turnFor, cells, isRoundOver, opponent, player1Mark])

	// Cpu makes clever moves
	// useEffect(() => {
	// 	const cpuMark = player1Mark === "X" ? "O" : "X"
	// 	const cpuMovesKey = cpuMark === "X" ? "x" : "o"
	// 	const playerMovesKey = player1Mark === "X" ? "x" : "o"

	// 	if (opponent === "cpu") {
	// 		if (turnFor === cpuMark && !isRoundOver) {
	// 			// prettier-ignore
	// 			const bestMove = getBestMove({cells, moves, cpuMovesKey, playerMovesKey, cpuMark, player1Mark, winConditions, cellsData, difficulty: 1,})
	// 			if (bestMove !== null) {
	// 				setTimeout(() => handleTurn(bestMove), 400)
	// 			}
	// 		}
	// 	}
	// }, [turnFor])

	//populate scoreboard
	useEffect(() => {
		if (winner) {
			setScoreboard((prev) => {
				if (winner.mark === "X") return {...prev, x: prev.x + 1}
				if (winner.mark === "O") return {...prev, o: prev.o + 1}
				return {...prev, ties: prev.ties + 1}
			})
		}
	}, [winner])

	// prettier-ignore
	return (
		<>
			<div className="game-on-container">
				<header className="game-on-header">
					<img src={logo} alt="Tic tac toe logo" />
					<h1 className="turn-indicator body-text">{turnFor === "X" ? <X /> : <O />} Turn</h1>
					<button className="btn-restart" onClick={() => setRestart(true)}>
						<img src={restartIcon} alt="restart icon" />
					</button>
				</header>
				<div className="board">
					{cells.map((cell) => (
						<button
							className={`cell ${cell.turnIcon === "X" ? "x" : "o"}`}
							key={cell.id}
							onClick={() => handleTurn(cell.id)}
							disabled={cell.isHeld || isRoundOver || !isHumanTurn}>
							{cell.turnIcon === "X" && <X />}
							{cell.turnIcon === "O" && <O />}
						</button>
					))}
				</div>
				<div className="scoreboard">
					<p className="x body-text">
						X ({opponent === "player" ? (player1Mark === "X" ? "P1" : "P2") : (player1Mark === "X" ? "YOU" : "CPU")})
						<span className="heading-s">{scoreboard.x}</span>
					</p>
					<p className="ties body-text">
						TIES <span className="heading-s">{scoreboard.ties}</span>
					</p>
					<p className="o body-text">
						O ({opponent === "player" ? (player1Mark === "O" ? "P1" : "P2") : (player1Mark === "O" ? "YOU" : "CPU")})
						<span className="heading-s">{scoreboard.o}</span>
					</p>
				</div>
			</div>
			{(isRoundOver || restart) && (
				<div className="overlay">
					<RoundOver winner={winner} handleNextRound={handleNextRound} 
						setIsGameOn={setIsGameOn} restart={restart} setRestart={setRestart}
					/>
				</div>
			)}
		</>
		)
}

/*
		WHY handleTurn LOGIC WORKS (IMPORTANT):
		- React state updates (setState) are asynchronous.
		- You CANNOT rely on state values updating immediately inside !!!the same function!!!.
		- Reordering setState calls does NOT change this behavior.

		Core rules used here:
		1. Capture the current player at the start of the function:
			- `currentPlayer` represents the player who JUST made the move.
			- This avoids relying on React’s async state timing.

		2. Compute the next game state synchronously:
			- `newMoves` is a local snapshot of the updated moves.
			- Winner / tie logic MUST use this snapshot, not React state.

		3. Decide game-over BEFORE flipping the turn:
			- Game-over is an event tied to THIS move.
			- If the game ends, the turn should not advance.

		Why not use useEffect:
		- `isRoundOver` is an event, not derived state.
		- useEffect would run AFTER render and may trigger multiple times.

		Key takeaway:
		- Never "set state → then read state" for game logic.
		- Always base decisions on local variables representing the next state.
	*/

// NOTE FOR USEEFFECT
// Score update is triggered by `winner` via useEffect.
// React warns about possible cascading renders, but logic is safe here.
// This will be refactored later if game complexity grows.
