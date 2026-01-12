import { expect, test } from "bun:test"
import { toValidMovesFromReversiBoard } from "@/board/to-valid-moves-from-reversi-board"
import { createReversiState } from "@/state/create-reversi-state"

test("returns 4 valid moves for initial board", () => {
  const state = createReversiState()
  const moves = toValidMovesFromReversiBoard(state.board, state.currentPlayer)
  expect(moves.length).toBe(4)
})

test("includes correct positions for black's first move", () => {
  const state = createReversiState()
  const moves = toValidMovesFromReversiBoard(state.board, state.currentPlayer)
  const positions = moves.map((m) => `${m.row},${m.col}`)
  expect(positions).toContain("2,3")
  expect(positions).toContain("3,2")
  expect(positions).toContain("4,5")
  expect(positions).toContain("5,4")
})
