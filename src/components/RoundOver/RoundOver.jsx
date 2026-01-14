import "./RoundOver.css"

export default function RoundOver({winner, handleNextRound, setIsGameOn}) {
	return (
		<div className="round-over">
			<span className="winner-player body-text">{winner}</span>
			<h2 className="winner-mark">TAKES THE ROUND</h2>
			<div className="btns">
				<button className="btn secondary-btn heading-xs" onClick={() => setIsGameOn([false, ""])}>
					QUIT
				</button>
				<button className="btn primary-btn-1 heading-xs" onClick={handleNextRound}>
					NEXT ROUND
				</button>
			</div>
		</div>
	)
}
