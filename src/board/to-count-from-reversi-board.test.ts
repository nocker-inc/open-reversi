import { expect, test } from "bun:test"
import { createReversiBoard } from "@/board/create-reversi-board"
import { toCountFromReversiBoard } from "@/board/to-count-from-reversi-board"

test("counts black pieces on initial board", () => {
  const board = createReversiBoard()
  expect(toCountFromReversiBoard(board, "black")).toBe(2)
})

test("counts white pieces on initial board", () => {
  const board = createReversiBoard()
  expect(toCountFromReversiBoard(board, "white")).toBe(2)
})
