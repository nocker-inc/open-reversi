import { expect, test } from "bun:test"
import { ReversiEngine } from "@/engine"

test("creates initial game state", () => {
  const game = new ReversiEngine()
  expect(game.currentPlayer).toBe("black")
  expect(game.isGameOver).toBe(false)
  expect(game.previous).toBeUndefined()
})

test("returns valid places for initial board", () => {
  const game = new ReversiEngine()
  expect(game.validPlaces.length).toBe(4)
})

test("place with object position", () => {
  const game = new ReversiEngine()
  const result = game.place({ row: 2, col: 3 })
  expect(result).toBeInstanceOf(ReversiEngine)
  if (result instanceof ReversiEngine) {
    expect(result.board[2][3]).toBe("black")
    expect(result.currentPlayer).toBe("white")
  }
})

test("place with notation string", () => {
  const game = new ReversiEngine()
  const result = game.place("D3")
  expect(result).toBeInstanceOf(ReversiEngine)
  if (result instanceof ReversiEngine) {
    expect(result.board[2][3]).toBe("black")
    expect(result.currentPlayer).toBe("white")
  }
})

test("getCount returns piece count", () => {
  const game = new ReversiEngine()
  expect(game.getCount("black")).toBe(2)
  expect(game.getCount("white")).toBe(2)
})

test("getResult returns game result", () => {
  const game = new ReversiEngine()
  const result = game.getResult()
  expect(result.blackCount).toBe(2)
  expect(result.whiteCount).toBe(2)
  expect(result.winner).toBe("draw")
})

test("returns error for invalid place", () => {
  const game = new ReversiEngine()
  const result = game.place("A1")
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("No pieces can be flipped")
  }
})

test("returns error for occupied cell", () => {
  const game = new ReversiEngine()
  const result = game.place("D4")
  expect(result).toBeInstanceOf(Error)
  if (result instanceof Error) {
    expect(result.message).toContain("is already occupied")
  }
})

test("is immutable", () => {
  const game = new ReversiEngine()
  game.place("D3")
  expect(game.getCount("black")).toBe(2)
})

test("keeps previous state", () => {
  const game = new ReversiEngine()
  const result = game.place("D3")
  expect(result).toBeInstanceOf(ReversiEngine)
  if (result instanceof ReversiEngine) {
    expect(result.previous).toBe(game)
  }
})

test("undo returns previous state", () => {
  const game = new ReversiEngine()
  const placed = game.place("D3")
  expect(placed).toBeInstanceOf(ReversiEngine)
  if (placed instanceof ReversiEngine) {
    const undone = placed.undo()
    expect(undone).toBeInstanceOf(ReversiEngine)
    if (undone instanceof ReversiEngine) {
      expect(undone.getCount("black")).toBe(2)
    }
  }
})

test("undo returns error when no history", () => {
  const game = new ReversiEngine()
  const result = game.undo()
  expect(result).toBeInstanceOf(Error)
})

test("history returns all states from oldest to newest", () => {
  const game = new ReversiEngine()
  const move1 = game.place("D3")
  if (move1 instanceof Error) {
    throw move1
  }
  const move2 = move1.place("C3")
  if (move2 instanceof Error) {
    throw move2
  }
  const history = move2.history
  expect(history.length).toBe(3)
  expect(history[0]).toBe(game)
  expect(history[1]).toBe(move1)
  expect(history[2]).toBe(move2)
})
