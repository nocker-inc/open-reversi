import { expect, test } from "bun:test"
import { toCountFromReversiBoard } from "@/board/to-count-from-reversi-board"
import { createReversiState } from "@/state/create-reversi-state"

test("creates initial state with 4 pieces", () => {
  const state = createReversiState()
  expect(state.currentPlayer).toBe("black")
  expect(state.isGameOver).toBe(false)
  expect(toCountFromReversiBoard(state.board, "black")).toBe(2)
  expect(toCountFromReversiBoard(state.board, "white")).toBe(2)
})

test("returns correct cell value", () => {
  const state = createReversiState()
  expect(state.board[3][3]).toBe("white")
  expect(state.board[3][4]).toBe("black")
  expect(state.board[0][0]).toBe("empty")
})
