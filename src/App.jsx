import "./App.css"

import NewGameMenu from "./components/NewGameMenu/NewGameMenu"
import GameVsPlayer from "./components/GameVsPlayer/GameVsPlayer"
import GameVsCpu from "./components/GameVsCpu/GameVsCpu"

import {useState} from "react"

export default function App() {
	const [player1Mark, setPlayer1Mark] = useState("X")
	const [isGameOn, setIsGameOn] = useState([false, ""])

	// prettier-ignore
	return ( 
		!isGameOn[0] 
		? <NewGameMenu player1Mark={player1Mark}  setPlayer1Mark={setPlayer1Mark} setIsGameOn={setIsGameOn} /> 
	 	: isGameOn[0] === true && isGameOn[1] === "vsCpu" 
		? <GameVsCpu />
		: isGameOn[0] === true && isGameOn[1] === "vsPlayer" 
		? <GameVsPlayer player1Mark={player1Mark} setIsGameOn={setIsGameOn}  /> 
		: null
	)
}
