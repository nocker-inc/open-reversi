import { expect, test } from "bun:test"
import { createReversiBoard } from "@/board/create-reversi-board"

test("creates 8x8 board", () => {
  const board = createReversiBoard()
  expect(board.length).toBe(8)
  expect(board[0].length).toBe(8)
})

test("places initial pieces correctly", () => {
  const board = createReversiBoard()
  expect(board[3][3]).toBe("white")
  expect(board[3][4]).toBe("black")
  expect(board[4][3]).toBe("black")
  expect(board[4][4]).toBe("white")
})

test("fills remaining cells with empty", () => {
  const board = createReversiBoard()
  expect(board[0][0]).toBe("empty")
  expect(board[7][7]).toBe("empty")
  expect(board[2][3]).toBe("empty")
})
