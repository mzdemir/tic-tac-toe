import logo from "../../assets/logo.svg"

import MarkSelection from "../MarkSelection/MarkSelection"

export default function NewGameMenu({player1Mark, setPlayer1Mark, setIsGameOn}) {
	//prettier-ignore
	return (
		<div className="new-game-menu">
			<img src={logo} alt="Tic tac toe logo" />

			<header className="main-header">
				<h1 className="main-title heading-xs">PICK PLAYER 1'S MARK</h1>
				<MarkSelection player1Mark={player1Mark} setPlayer1Mark={setPlayer1Mark} />
				<p className="body-text">REMEMBER : X GOES FIRST</p>
			</header>
			
			<div className="new-game-btns">
				<button 
					className="btn-1 heading-xs" 
					onClick={() => setIsGameOn([true, "vsCpu"])}>
					NEW GAME (VS CPU)
				</button>
				<button 
					className="btn-2 heading-xs"
					onClick={() => setIsGameOn([true, "vsPlayer"])}>
					NEW GAME (VS PLAYER)
				</button>
			</div>
		</div>
	)
}
