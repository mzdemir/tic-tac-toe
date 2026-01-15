import "./RoundOver.css"

import {X, O} from "../Marks"

export default function RoundOver({winner, handleNextRound, setIsGameOn}) {
	return (
		<div className="round-over">
			{winner.mark ? (
				<>
					<span className="winner-player body-text">{winner.message}</span>
					<h2 className={`winner-mark heading-m ${winner.mark === "X" && "X"}`}>
						{winner.mark === "X" ? <X /> : <O />}TAKES THE ROUND
					</h2>
				</>
			) : (
				<h2 className="tied heading-m">{winner.message}</h2>
			)}
			<div className="btns">
				<button className="btn-secondary-2 heading-xs" onClick={() => setIsGameOn([false, ""])}>
					QUIT
				</button>
				<button className="btn-secondary-1 heading-xs" onClick={handleNextRound}>
					NEXT ROUND
				</button>
			</div>
		</div>
	)
}
