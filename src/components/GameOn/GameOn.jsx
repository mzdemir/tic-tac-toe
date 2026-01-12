import "./GameOn.css"
import logo from "../../assets/logo.svg"
import restartIcon from "../../assets/icon-restart.svg"
import cellsData from "../../assets/cells"

import {X, O} from "../Marks"

import {useState} from "react"

export default function GameOn({setIsGameOn, playerMark}) {
	const [cells, setCells] = useState(cellsData)
	const [turnFor, setTurnFor] = useState("X")

	const isRoundOver = cells.every((item) => item.isHeld === true)

	// prettier-ignore
	function handleTurn(id) {
		setCells((prevCells) => prevCells.map((item) =>
      item.id === id 
        ? { ...item, src: turnFor === "X" ? <X /> : <O />, isHeld: true } 
        : item
      )
		)
		setTurnFor((prev) => prev === "X" ? "O" : "X")
	}

	return (
		<div className="game-on-container">
			<header className="game-on-header">
				<img src={logo} alt="Tic tac toe logo" />
				<h1 className="turn-indicator body-text">{turnFor === "X" ? <X /> : <O />} Turn</h1>
				<button onClick={() => setIsGameOn(false)} className="secondary-btn restart-btn ">
					<img src={restartIcon} alt="" />
				</button>
			</header>
			{/* prettier-ignore */}
			<div className="board">{cells.map((cell) => (
		    <button className="cell" 
          key={cell.id} 
          onClick={() => handleTurn(cell.id)} 
          disabled={cell.isHeld}>
			    {cell.src}
		    </button>))}
      </div>
		</div>
	)
}
