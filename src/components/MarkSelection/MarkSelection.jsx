import "./MarkSelection.css"
import {X, O} from "../Marks"

export default function MarkSelection({player1Mark, setPlayer1Mark}) {
	return (
		<div className="mark-container">
			<label htmlFor="option1" className="mark x-mark">
				<input
					type="radio"
					id="option1"
					name="toggle"
					value="X"
					checked={player1Mark === "X"}
					onChange={(event) => setPlayer1Mark(event.target.value)}
				/>
				<X />
			</label>
			<label htmlFor="option2" className="mark o-mark">
				<input
					type="radio"
					id="option2"
					name="toggle"
					value="O"
					checked={player1Mark === "O"}
					onChange={(event) => setPlayer1Mark(event.target.value)}
				/>
				<O />
			</label>
			<span className="slider"></span>
		</div>
	)
}
