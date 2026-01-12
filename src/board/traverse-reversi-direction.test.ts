import { expect, test } from "bun:test"
import { createReversiBoard } from "@/board/create-reversi-board"
import { traverseReversiDirection } from "@/board/traverse-reversi-direction"

test("returns empty array when out of bounds", () => {
  const board = createReversiBoard()
  const result = traverseReversiDirection({
    board,
    row: -1,
    col: 0,
    direction: { row: 0, col: 1 },
    target: "white",
    stop: "black",
    candidates: [],
  })
  expect(result.length).toBe(0)
})

test("returns empty array when cell is empty", () => {
  const board = createReversiBoard()
  const result = traverseReversiDirection({
    board,
    row: 0,
    col: 0,
    direction: { row: 0, col: 1 },
    target: "white",
    stop: "black",
    candidates: [],
  })
  expect(result.length).toBe(0)
})

test("returns candidates when stop cell is found", () => {
  const board = createReversiBoard()
  const result = traverseReversiDirection({
    board,
    row: 3,
    col: 3,
    direction: { row: 0, col: 1 },
    target: "white",
    stop: "black",
    candidates: [],
  })
  expect(result.length).toBe(1)
  expect(result[0].row).toBe(3)
  expect(result[0].col).toBe(3)
})

test("accumulates target cells until stop", () => {
  const board = createReversiBoard()
  const result = traverseReversiDirection({
    board,
    row: 4,
    col: 3,
    direction: { row: -1, col: 0 },
    target: "black",
    stop: "white",
    candidates: [],
  })
  expect(result.length).toBe(1)
  expect(result[0].row).toBe(4)
  expect(result[0].col).toBe(3)
})
