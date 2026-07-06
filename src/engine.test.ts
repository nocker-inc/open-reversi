import { expect, test } from "bun:test"
import { createReversiBoard } from "@/board/create-reversi-board"
import { updateReversiBoard } from "@/board/update-reversi-board"
import { ReversiEngine } from "@/engine"
import { ReversiErrorInvalidPosition } from "@/errors"
import type { ReversiState } from "@/types"

function createEndgameState(): ReversiState {
  const cleared = updateReversiBoard({
    board: createReversiBoard(),
    positions: [
      { row: 3, col: 3 },
      { row: 3, col: 4 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
    ],
    cell: "empty",
  })

  const withBlack = updateReversiBoard({
    board: cleared,
    positions: [
      { row: 0, col: 0 },
      { row: 7, col: 0 },
    ],
    cell: "black",
  })

  const board = updateReversiBoard({
    board: withBlack,
    positions: [
      { row: 0, col: 1 },
      { row: 7, col: 1 },
    ],
    cell: "white",
  })

  return { board, currentPlayer: "black", isGameOver: false }
}

function playToEnd(game: ReversiEngine, remaining: number): ReversiEngine {
  if (game.isGameOver || remaining === 0) {
    return game
  }

  if (game.isPassRequired) {
    const passed = game.pass()
    if (passed instanceof Error) {
      throw passed
    }
    return playToEnd(passed, remaining - 1)
  }

  const placed = game.place(game.validPlaces[0])
  if (placed instanceof Error) {
    throw placed
  }
  return playToEnd(placed, remaining - 1)
}

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

test("returns error for invalid notation", () => {
  const game = new ReversiEngine()
  expect(game.place("Z9")).toBeInstanceOf(ReversiErrorInvalidPosition)
  expect(game.place("A0")).toBeInstanceOf(ReversiErrorInvalidPosition)
  expect(game.place("")).toBeInstanceOf(ReversiErrorInvalidPosition)
})

test("returns error for out-of-range position", () => {
  const game = new ReversiEngine()
  expect(game.place({ row: 99, col: 0 })).toBeInstanceOf(
    ReversiErrorInvalidPosition,
  )
  expect(game.place({ row: -1, col: 0 })).toBeInstanceOf(
    ReversiErrorInvalidPosition,
  )
  expect(game.place({ row: 0, col: 8 })).toBeInstanceOf(
    ReversiErrorInvalidPosition,
  )
})

test("returns error for non-integer position", () => {
  const game = new ReversiEngine()
  expect(game.place({ row: 1.5, col: 0 })).toBeInstanceOf(
    ReversiErrorInvalidPosition,
  )
})

test("board is deeply frozen", () => {
  const game = new ReversiEngine()
  expect(Object.isFrozen(game.board)).toBe(true)
  for (const row of game.board) {
    expect(Object.isFrozen(row)).toBe(true)
  }
})

test("isPassRequired is false when valid moves exist", () => {
  const game = new ReversiEngine()
  expect(game.isPassRequired).toBe(false)
})

test("hands turn to opponent even when opponent must pass", () => {
  const game = new ReversiEngine(createEndgameState())
  const placed = game.place({ row: 0, col: 2 })
  if (placed instanceof Error) {
    throw placed
  }
  expect(placed.currentPlayer).toBe("white")
  expect(placed.isGameOver).toBe(false)
  expect(placed.isPassRequired).toBe(true)
})

test("pass hands turn back to the other player", () => {
  const game = new ReversiEngine(createEndgameState())
  const placed = game.place({ row: 0, col: 2 })
  if (placed instanceof Error) {
    throw placed
  }
  const passed = placed.pass()
  if (passed instanceof Error) {
    throw passed
  }
  expect(passed.currentPlayer).toBe("black")
  expect(passed.isGameOver).toBe(false)
  expect(passed.isPassRequired).toBe(false)
})

test("game ends when neither player can move", () => {
  const game = new ReversiEngine(createEndgameState())
  const placed = game.place({ row: 0, col: 2 })
  if (placed instanceof Error) {
    throw placed
  }
  const passed = placed.pass()
  if (passed instanceof Error) {
    throw passed
  }
  const finished = passed.place({ row: 7, col: 2 })
  if (finished instanceof Error) {
    throw finished
  }
  expect(finished.isGameOver).toBe(true)
  expect(finished.getCount("white")).toBe(0)
  expect(finished.getResult().winner).toBe("black")
})

test("plays a full game to completion", () => {
  const finished = playToEnd(new ReversiEngine(), 200)
  expect(finished.isGameOver).toBe(true)
  expect(finished.validPlaces.length).toBe(0)
  expect(finished.isPassRequired).toBe(false)
  const result = finished.getResult()
  expect(result.blackCount + result.whiteCount).toBeGreaterThan(4)
  expect(result.blackCount + result.whiteCount).toBeLessThanOrEqual(64)
  expect(finished.history.length).toBeGreaterThan(2)
})
