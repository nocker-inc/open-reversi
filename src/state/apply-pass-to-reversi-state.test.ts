import { expect, test } from "bun:test"
import { applyPassToReversiState } from "@/state/apply-pass-to-reversi-state"
import { createReversiState } from "@/state/create-reversi-state"

test("returns error when valid moves exist", () => {
  const state = createReversiState()
  const result = applyPassToReversiState({ state })
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("Cannot pass when valid moves exist")
  }
})

test("returns error when game is over", () => {
  const state = createReversiState()
  const gameOver = { ...state, isGameOver: true }
  const result = applyPassToReversiState({ state: gameOver })
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("Game is already over")
  }
})
