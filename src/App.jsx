import "./App.css"

import NewGameMenu from "./components/NewGameMenu/NewGameMenu"
import Game from "./components/Game/Game"

import {useState} from "react"

export default function App() {
	const [player1Mark, setPlayer1Mark] = useState("X")
	const [isGameOn, setIsGameOn] = useState(false)
	const [opponent, setOpponent] = useState("")

	// prettier-ignore
	return ( 
		!isGameOn
		? <NewGameMenu player1Mark={player1Mark}  setPlayer1Mark={setPlayer1Mark} setIsGameOn={setIsGameOn} setOpponent={setOpponent}/> 
	 	: isGameOn === true
		? <Game player1Mark={player1Mark} setIsGameOn={setIsGameOn} opponent={opponent} /> 
		: null
	)
}
