import { expect, test } from "bun:test"
import { createReversiBoard } from "@/board/create-reversi-board"
import { freezeReversiBoard } from "@/board/freeze-reversi-board"
import { updateReversiBoard } from "@/board/update-reversi-board"

test("freezes the board and all rows", () => {
  const board = freezeReversiBoard(createReversiBoard())
  expect(Object.isFrozen(board)).toBe(true)
  for (const row of board) {
    expect(Object.isFrozen(row)).toBe(true)
  }
})

test("createReversiBoard returns a frozen board", () => {
  const board = createReversiBoard()
  expect(Object.isFrozen(board)).toBe(true)
  expect(Object.isFrozen(board[0])).toBe(true)
})

test("updateReversiBoard returns a frozen board", () => {
  const board = updateReversiBoard({
    board: createReversiBoard(),
    positions: [{ row: 0, col: 0 }],
    cell: "black",
  })
  expect(Object.isFrozen(board)).toBe(true)
  expect(Object.isFrozen(board[0])).toBe(true)
})

test("preserves cell values", () => {
  const board = freezeReversiBoard(createReversiBoard())
  expect(board[3][3]).toBe("white")
  expect(board[3][4]).toBe("black")
  expect(board[0][0]).toBe("empty")
})
