import { expect, test } from "bun:test"
import { createReversiBoard } from "@/board/create-reversi-board"
import { updateReversiBoard } from "@/board/update-reversi-board"

test("updates single position", () => {
  const board = createReversiBoard()
  const updated = updateReversiBoard({
    board,
    positions: [{ row: 0, col: 0 }],
    cell: "black",
  })
  expect(updated[0][0]).toBe("black")
})

test("updates multiple positions", () => {
  const board = createReversiBoard()
  const updated = updateReversiBoard({
    board,
    positions: [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
    ],
    cell: "white",
  })
  expect(updated[0][0]).toBe("white")
  expect(updated[1][1]).toBe("white")
})

test("does not modify original board", () => {
  const board = createReversiBoard()
  updateReversiBoard({
    board,
    positions: [{ row: 0, col: 0 }],
    cell: "black",
  })
  expect(board[0][0]).toBe("empty")
})

test("preserves other cells", () => {
  const board = createReversiBoard()
  const updated = updateReversiBoard({
    board,
    positions: [{ row: 0, col: 0 }],
    cell: "black",
  })
  expect(updated[3][3]).toBe("white")
  expect(updated[3][4]).toBe("black")
})
