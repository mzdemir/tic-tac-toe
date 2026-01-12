import "./MarkSelection.css"
import {X, O} from "../Marks"

export default function MarkSelection({playerMark, setPlayerMark}) {
	function getPlayerMark(event) {
		setPlayerMark(event.target.value)
	}

	return (
		<div className="mark-container">
			<label htmlFor="option1" className="mark x-mark">
				<input
					type="radio"
					id="option1"
					name="toggle"
					value="X"
					checked={playerMark === "X"}
					onChange={getPlayerMark}
				/>
				<X />
			</label>
			<label htmlFor="option2" className="mark o-mark">
				<input
					type="radio"
					id="option2"
					name="toggle"
					value="O"
					checked={playerMark === "O"}
					onChange={getPlayerMark}
				/>
				<O />
			</label>
			<span className="slider"></span>
		</div>
	)
}
