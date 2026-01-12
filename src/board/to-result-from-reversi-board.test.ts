import { expect, test } from "bun:test"
import { toResultFromReversiBoard } from "@/board/to-result-from-reversi-board"
import { applyMoveToReversiState } from "@/state/apply-move-to-reversi-state"
import { createReversiState } from "@/state/create-reversi-state"

test("returns current score", () => {
  const state = createReversiState()
  const result = toResultFromReversiBoard(state.board)
  expect(result.blackCount).toBe(2)
  expect(result.whiteCount).toBe(2)
  expect(result.winner).toBe("draw")
})

test("returns correct winner when black leads", () => {
  const state = createReversiState()
  const next = applyMoveToReversiState({
    state,
    position: { row: 2, col: 3 },
  })
  if (next instanceof Error) {
    throw next
  }
  const result = toResultFromReversiBoard(next.board)
  expect(result.blackCount).toBe(4)
  expect(result.whiteCount).toBe(1)
  expect(result.winner).toBe("black")
})
