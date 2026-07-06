import { expect, test } from "bun:test"
import {
  ReversiErrorCannotPass,
  ReversiErrorCellOccupied,
  ReversiErrorGameOver,
  ReversiErrorInvalidPosition,
  ReversiErrorNoFlip,
  ReversiErrorNoHistory,
} from "@/errors"
import { createReversiState } from "@/state/create-reversi-state"

test("ReversiErrorGameOver has correct message", () => {
  const state = createReversiState()
  const error = new ReversiErrorGameOver(state.board)
  expect(error.message).toContain("error[E001]")
  expect(error.message).toContain("Game is already over")
  expect(error.name).toBe("ReversiErrorGameOver")
})

test("ReversiErrorGameOver toPlain removes ANSI codes", () => {
  const state = createReversiState()
  const error = new ReversiErrorGameOver(state.board)
  const plain = error.toPlain()
  expect(plain).not.toContain("\x1b[")
  expect(plain).toContain("error[E001]")
})

test("ReversiErrorCellOccupied has correct message", () => {
  const state = createReversiState()
  const error = new ReversiErrorCellOccupied(state.board, { row: 3, col: 3 })
  expect(error.message).toContain("error[E002]")
  expect(error.message).toContain("Cell is already occupied")
  expect(error.message).toContain("D4")
  expect(error.name).toBe("ReversiErrorCellOccupied")
})

test("ReversiErrorCellOccupied toPlain shows position marker", () => {
  const state = createReversiState()
  const error = new ReversiErrorCellOccupied(state.board, { row: 3, col: 3 })
  const plain = error.toPlain()
  expect(plain).toContain("*")
  expect(plain).toContain("<--")
})

test("ReversiErrorNoFlip has correct message", () => {
  const state = createReversiState()
  const error = new ReversiErrorNoFlip(state.board, { row: 0, col: 0 })
  expect(error.message).toContain("error[E003]")
  expect(error.message).toContain("No pieces can be flipped")
  expect(error.name).toBe("ReversiErrorNoFlip")
})

test("ReversiErrorCannotPass has correct message", () => {
  const state = createReversiState()
  const error = new ReversiErrorCannotPass(state.board)
  expect(error.message).toContain("error[E004]")
  expect(error.message).toContain("Cannot pass when valid moves exist")
  expect(error.name).toBe("ReversiErrorCannotPass")
})

test("ReversiErrorInvalidPosition has correct message", () => {
  const error = new ReversiErrorInvalidPosition("Z9")
  expect(error.message).toContain("error[E006]")
  expect(error.message).toContain("Invalid position")
  expect(error.message).toContain("Z9")
  expect(error.name).toBe("ReversiErrorInvalidPosition")
  expect(error.input).toBe("Z9")
})

test("ReversiErrorInvalidPosition toPlain returns same message", () => {
  const error = new ReversiErrorInvalidPosition("Z9")
  expect(error.toPlain()).toBe(error.message)
})

test("ReversiErrorNoHistory has correct message", () => {
  const error = new ReversiErrorNoHistory()
  expect(error.message).toBe("error[E005]: No previous state to undo")
  expect(error.name).toBe("ReversiErrorNoHistory")
})

test("ReversiErrorNoHistory toPlain returns same message", () => {
  const error = new ReversiErrorNoHistory()
  expect(error.toPlain()).toBe("error[E005]: No previous state to undo")
})
