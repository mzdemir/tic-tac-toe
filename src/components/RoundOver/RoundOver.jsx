import "./RoundOver.css"

import {X, O} from "../Marks"

export default function RoundOver({winner, handleNextRound, setIsGameOn, restart, setRestart}) {
	// prettier-ignore
	return (
		<div 
			className="round-over"
			role="dialog"
			aria-modal="true"
			aria-labelledby={restart ? "restart-title" : winner?.mark ? "winner-title" : "tie-title"}
		>
			{restart ? 
				<>
					<h2 id="restart-title" className="tied heading-m">RESTART GAME?</h2>
					<div className="btns">
						<button className="btn-secondary-2 heading-xs" onClick={() => setRestart(false)}>
							NO, CANCEL
						</button>
						<button className="btn-secondary-1 heading-xs" onClick={() => setIsGameOn(false)}>
							YES, RESTART
						</button>
					</div>
				</>
			:	<>
					{winner.mark ?
					<>
						<span className="winner-player body-text">{winner.message}</span>
						<h2 id="winner-title" className={`winner-mark heading-m ${winner.mark === "X" && "X"}`}>
							{winner.mark === "X" ? <X />:	<O />} TAKES THE ROUND
						</h2>
					</>
					:	<h2 id="tie-title" className="tied heading-m">{winner.message}</h2>}
						<div className="btns">
							<button className="btn-secondary-2 heading-xs" onClick={() => setIsGameOn(false)}>
								QUIT
							</button>
							<button className="btn-secondary-1 heading-xs" onClick={handleNextRound}>
								NEXT ROUND
							</button>
						</div>
				</>
			}
		</div>
	)
}
