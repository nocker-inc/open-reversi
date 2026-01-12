import { expect, test } from "bun:test"
import { print } from "@/print"
import { applyMoveToReversiState } from "@/state/apply-move-to-reversi-state"
import { createReversiState } from "@/state/create-reversi-state"

test("prints initial board with pieces", () => {
  const state = createReversiState()
  const output = print(state.board)
  expect(output).toContain("○")
  expect(output).toContain("●")
})

test("prints correct initial layout", () => {
  const state = createReversiState()
  const output = print(state.board)
  const lines = output.split("\n")
  expect(lines[0]).toBe("  A B C D E F G H")
  expect(lines[4]).toBe("4 . . . ○ ● . . .")
  expect(lines[5]).toBe("5 . . . ● ○ . . .")
})

test("prints empty cells as dots", () => {
  const state = createReversiState()
  const output = print(state.board)
  expect(output).toContain(". . . . . . . .")
})

test("reflects board changes after move", () => {
  const state = createReversiState()
  const next = applyMoveToReversiState({
    state,
    position: { row: 2, col: 3 },
  })
  if (next instanceof Error) {
    throw next
  }
  const output = print(next.board)
  const lines = output.split("\n")
  expect(lines[3]).toBe("3 . . . ● . . . .")
  expect(lines[4]).toBe("4 . . . ● ● . . .")
})
