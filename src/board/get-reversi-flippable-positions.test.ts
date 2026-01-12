import { expect, test } from "bun:test"
import { createReversiBoard } from "@/board/create-reversi-board"
import { getReversiFlippablePositions } from "@/board/get-reversi-flippable-positions"

test("returns flippable positions for valid move", () => {
  const board = createReversiBoard()
  const flippable = getReversiFlippablePositions({
    board,
    position: { row: 2, col: 3 },
    player: "black",
  })
  expect(flippable.length).toBe(1)
  expect(flippable[0].row).toBe(3)
  expect(flippable[0].col).toBe(3)
})

test("returns empty array for invalid move", () => {
  const board = createReversiBoard()
  const flippable = getReversiFlippablePositions({
    board,
    position: { row: 0, col: 0 },
    player: "black",
  })
  expect(flippable.length).toBe(0)
})

test("returns multiple flippable positions", () => {
  const board = createReversiBoard()
  const flippable = getReversiFlippablePositions({
    board,
    position: { row: 3, col: 2 },
    player: "black",
  })
  expect(flippable.length).toBe(1)
  expect(flippable[0].row).toBe(3)
  expect(flippable[0].col).toBe(3)
})
