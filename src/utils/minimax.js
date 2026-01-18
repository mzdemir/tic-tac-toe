// minimax utilities for Tic-Tac-Toe CPU logic. This file contains ONLY pure functions.

// This function checks if a given simulated board state has a winner or is a tie.
// IMPORTANT:
// - This function works ONLY with the simulated moves passed to it
// - It NEVER reads React state

export function checkWinner(simMoves, winConditions) {
	// If any win condition is fully contained in X's simulated moves, then X is the winner in this simulated board
	if (winConditions.some((condition) => condition.every((num) => simMoves.x.includes(num)))) return "X"
	// Same logic for O
	if (winConditions.some((condition) => condition.every((num) => simMoves.o.includes(num)))) return "O"
	// If total simulated moves reach 9 and nobody won, the board is full → tie
	if (simMoves.x.length + simMoves.o.length === 9) return "tie"
	// No winner yet → game still ongoing
	return null
}

// Minimax is a recursive function that simulates all possible future game states and assigns them scores.
// Parameters:
// - simMoves: a simulated version of the moves object {x: [], o: []}
// - isMaximizing:
	// true  → CPU's turn (try to maximize score)
	// false → Player's turn (try to minimize score)
// Return values:
// 1  → CPU will win
// 0  → tie
// -1 → CPU will lose

export function minimax({simMoves, isMaximizing, cpuMark, player1Mark, cpuMovesKey, playerMovesKey, winConditions, cellsData}) {
	// First, check if the current simulated board already resulted in a win or tie
	const result = checkWinner(simMoves, winConditions)
	// If CPU has won in this simulation, this branch is good for CPU → return +1
	if (result === cpuMark) return 1
	// If Player has won, this branch is bad for CPU → return -1
	if (result === player1Mark) return -1
	// If it's a tie, neither side gains advantage → return 0
	if (result === "tie") return 0
	// Get all available squares that are NOT used in the simulated moves.
	// We use cellsData (static board definition) instead of React state because minimax must be pure and predictable.
	const available = cellsData.map((cell) => cell.id).filter((id) => !simMoves.x.includes(id) && !simMoves.o.includes(id))
	// If isMaximizing === true, it means it's CPU's turn and CPU wants the HIGHEST possible score.
	if (isMaximizing) {
		// Start with the worst possible score for CPU
		let best = -Infinity
		// Try every available move
		for (let id of available) {
			// Create a NEW simulated board where CPU makes a move at "id"
			const nextMoves = {...simMoves, [cpuMovesKey]: [...simMoves[cpuMovesKey], id]}
			// Recursively evaluate this move, now switching to player's turn
			// Keep the best possible score for CPU
			best = Math.max(best,minimax(
				{simMoves: nextMoves, isMaximizing: false, cpuMark, player1Mark, cpuMovesKey, playerMovesKey, winConditions, cellsData}
			))
		}
		// Return the best outcome CPU can guarantee
		return best
	} else {
		// If isMaximizing === false, it means it's the PLAYER's turn.
		// The player tries to MINIMIZE the outcome(because player wants CPU to lose).
		// Start with the worst possible score for player
		let best = Infinity
		// Try every available move
		for (let id of available) {
			// Create a NEW simulated board where PLAYER makes a move at "id"
			const nextMoves = {...simMoves, [playerMovesKey]: [...simMoves[playerMovesKey], id]}
			// Recursively evaluate this move, now switching back to CPU's turn
			// Player picks the move that hurts CPU the most
			best = Math.min(best, minimax(
				{simMoves: nextMoves, isMaximizing: true, cpuMark, player1Mark, cpuMovesKey, playerMovesKey, winConditions, cellsData}
			))
		}
		// Return the best outcome player can force
		return best
	}
}

// This function decides which move the CPU will play on the REAL board.
// Unlike perfect minimax, this version is intentionally imperfect to make the game beatable.
export function getBestMove({cells, moves, cpuMovesKey, playerMovesKey, cpuMark, player1Mark, winConditions, cellsData, difficulty = 1}) {
	// If there are no available moves, return null (tie or game over)
	if (cells.every((cell) => cell.isHeld)) return null
	// moveScores will store EVERY possible CPU moveetogether with its minimax evaluation score.
	// Example: [{id: 5, score: 1}, {id: 1, score: 0}, {id: 9, score: -1}]
	let moveScores = []
	// Get all currently empty cells on the real board
	const available = cells.filter((cell) => !cell.isHeld).map((c) => c.id)
	// Evaluate every possible CPU move using minimax.	We do NOT immediately pick the best one.
	for (let id of available) {
		// Create a simulated board state where the CPU plays at position "id"
		const testMoves = {...moves, [cpuMovesKey]: [...moves[cpuMovesKey], id]}
		// Score this simulated move assuming the player goes next
		const score = minimax({simMoves: testMoves, isMaximizing: false, cpuMark, player1Mark, cpuMovesKey, playerMovesKey, winConditions, cellsData})
		// Store the move and its score for later comparison
		moveScores.push({id, score})
	}
	// Sort moves from BEST score to WORST score. After sorting:
	// - index 0   → strongest move
	// - last item → weakest move
	moveScores.sort((a, b) => b.score - a.score)
	// DIFFICULTY CONTROL:
	// The CPU will NOT always choose the best move. Instead, it randomly picks from the top N moves.
		// difficulty = 0 → very easy (often bad moves)
		// difficulty = 1 → easy
		// difficulty = 2 → medium
		// difficulty = 3 → hard (almost perfect)
	// Limit how many of the top moves the CPU can choose from. This guarantees:
		// - CPU still prefers strong moves
		// - But may make mistakes intentionally
	const pickFromTop = Math.min(difficulty + 1, moveScores.length)
	// Pick a random index from the allowed range. Higher difficulty → smaller chance of mistakes.
	const randomIndex = Math.floor(Math.random() * pickFromTop)
	// If no moves exist, CPU should do nothing
	if (moveScores.length === 0) return null
	return moveScores[randomIndex].id
}