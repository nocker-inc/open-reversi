import { expect, test } from "bun:test"
import { toCountFromReversiBoard } from "@/board/to-count-from-reversi-board"
import { applyMoveToReversiState } from "@/state/apply-move-to-reversi-state"
import { createReversiState } from "@/state/create-reversi-state"

test("places piece and flips opponent pieces", () => {
  const state = createReversiState()
  const result = applyMoveToReversiState({
    state,
    position: { row: 2, col: 3 },
  })
  expect(result).not.toBeInstanceOf(Error)
  if (!(result instanceof Error)) {
    expect(result.board[2][3]).toBe("black")
    expect(result.board[3][3]).toBe("black")
    expect(toCountFromReversiBoard(result.board, "black")).toBe(4)
    expect(toCountFromReversiBoard(result.board, "white")).toBe(1)
  }
})

test("switches to opponent after move", () => {
  const state = createReversiState()
  const result = applyMoveToReversiState({
    state,
    position: { row: 2, col: 3 },
  })
  expect(result).not.toBeInstanceOf(Error)
  if (!(result instanceof Error)) {
    expect(result.currentPlayer).toBe("white")
  }
})

test("returns error when no pieces can be flipped", () => {
  const state = createReversiState()
  const result = applyMoveToReversiState({
    state,
    position: { row: 0, col: 0 },
  })
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("No pieces can be flipped")
  }
})

test("returns error when cell is occupied", () => {
  const state = createReversiState()
  const result = applyMoveToReversiState({
    state,
    position: { row: 3, col: 3 },
  })
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("is already occupied")
  }
})

test("returns error when game is over", () => {
  const state = createReversiState()
  const gameOver = { ...state, isGameOver: true }
  const result = applyMoveToReversiState({
    state: gameOver,
    position: { row: 2, col: 3 },
  })
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("Game is already over")
  }
})

test("returns error for out-of-range position", () => {
  const state = createReversiState()
  const result = applyMoveToReversiState({
    state,
    position: { row: 99, col: 0 },
  })
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("Invalid position")
  }
})

test("returns frozen state", () => {
  const state = createReversiState()
  const result = applyMoveToReversiState({
    state,
    position: { row: 2, col: 3 },
  })
  expect(result).not.toBeInstanceOf(Error)
  if (!(result instanceof Error)) {
    expect(Object.isFrozen(result)).toBe(true)
    expect(Object.isFrozen(result.board)).toBe(true)
  }
})

test("original state is not modified", () => {
  const state = createReversiState()
  applyMoveToReversiState({ state, position: { row: 2, col: 3 } })
  expect(toCountFromReversiBoard(state.board, "black")).toBe(2)
  expect(toCountFromReversiBoard(state.board, "white")).toBe(2)
})
