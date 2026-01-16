import "../GameVsPlayer/GameVsPlayer.css"
import logo from "../../assets/logo.svg"
import restartIcon from "../../assets/icon-restart.svg"
import cellsData from "../../assets/cells"
import {getBestMove} from "../../utils/minimax"

import {X, O} from "../Marks"
import RoundOver from "../RoundOver/RoundOver"

import {useState, useEffect} from "react"

export default function GameVsCPU({player1Mark, setIsGameOn}) {
	const [cells, setCells] = useState(cellsData)
	const [turnFor, setTurnFor] = useState("X")
	const [moves, setMoves] = useState({x: [], o: []})
	const [isRoundOver, setIsRoundOver] = useState(false)
	const [scoreboard, setScoreboard] = useState({x: 0, o: 0, ties: 0})
	const [winner, setWinner] = useState(null)
	const [restart, setRestart] = useState(false)

	const cpuMark = player1Mark === "X" ? "O" : "X"
	const cpuMovesKey = cpuMark === "X" ? "x" : "o"
	const playerMovesKey = player1Mark === "X" ? "x" : "o"

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

	function handleTurn(id) {
		const currentPlayer = turnFor

		setCells((prev) => prev.map((cell) => (cell.id === id ? {...cell, isHeld: true, turnIcon: currentPlayer} : cell)))

		const newMoves = currentPlayer === "X" ? {...moves, x: [...moves.x, id]} : {...moves, o: [...moves.o, id]}

		setMoves(newMoves)

		const xWon = winConditions.some((c) => c.every((n) => newMoves.x.includes(n)))
		const oWon = winConditions.some((c) => c.every((n) => newMoves.o.includes(n)))
		const tie = newMoves.x.length + newMoves.o.length === 9

		if (xWon || oWon || tie) setIsRoundOver(true)

		if (xWon && player1Mark === "X") setWinner({mark: "X", message: "Player 1 wins!"})
		if (xWon && player1Mark !== "X") setWinner({mark: "X", message: "CPU wins!"})
		if (oWon && player1Mark === "O") setWinner({mark: "O", message: "Player 1 wins!"})
		if (oWon && player1Mark !== "O") setWinner({mark: "O", message: "CPU wins!"})
		if (tie) setWinner({message: "Round Tied"})

		setTurnFor((prev) => (prev === "X" ? "O" : "X"))
	}

	/* -------------------- MINIMAX -------------------- */

	useEffect(() => {
		if (turnFor === cpuMark && !isRoundOver) {
			// prettier-ignore
			const bestMove = getBestMove({cells, moves, cpuMovesKey, playerMovesKey, cpuMark, playerMark: player1Mark, winConditions, cellsData, difficulty: 1})
			if (bestMove !== null) {
				setTimeout(() => handleTurn(bestMove), 400)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [turnFor])

	useEffect(() => {
		if (winner) {
			setScoreboard((prev) => {
				if (winner.mark === "X") return {...prev, x: prev.x + 1}
				if (winner.mark === "O") return {...prev, o: prev.o + 1}
				return {...prev, ties: prev.ties + 1}
			})
		}
	}, [winner])

	function handleNextRound() {
		setCells(cellsData)
		setTurnFor("X")
		setMoves({x: [], o: []})
		setWinner(null)
		setIsRoundOver(false)
	}

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
						disabled={cell.isHeld || isRoundOver}>
						{cell.turnIcon === "X" && <X />}
						{cell.turnIcon === "O" && <O />}
					</button>
				))}
			</div>
			<div className="scoreboard">
				<p className="x body-text">
					X ({player1Mark === "X" ? "P1" : "P2"})<span className="heading-s">{scoreboard.x}</span>
				</p>
				<p className="ties body-text">
					TIES <span className="heading-s">{scoreboard.ties}</span>
				</p>
				<p className="o body-text">
					O ({player1Mark === "O" ? "P1" : "P2"})<span className="heading-s">{scoreboard.o}</span>
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
