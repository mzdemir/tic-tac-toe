import "./App.css"
import logo from "./assets/logo.svg"

import MarkSelection from "./components/MarkSelection/MarkSelection"
import GameOn from "./components/GameOn/GameOn"

import {useState} from "react"

function App() {
	const [isGameOn, setIsGameOn] = useState(true)
	const [playerMark, setPlayerMark] = useState("X")

	return !isGameOn ? (
		<div className="new-game-menu">
			<img src={logo} alt="Tic tac toe logo" />

			<header className="main-header">
				<h1 className="main-title heading-xs">PICK PLAYER 1'S MARK</h1>
				<MarkSelection playerMark={playerMark} setPlayerMark={setPlayerMark} />
				<p className="body-text">REMEMBER : X GOES FIRST</p>
			</header>

			<div className="new-game-btns">
				<button className="btn primary-btn-1 heading-xs" onClick={() => setIsGameOn(true)}>
					NEW GAME (VS CPU)
				</button>
				<button className="btn primary-btn-2 heading-xs" onClick={() => setIsGameOn(true)}>
					NEW GAME (VS PLAYER)
				</button>
			</div>
		</div>
	) : (
		<GameOn setIsGameOn={setIsGameOn} playerMark={playerMark} />
	)
}

export default App
