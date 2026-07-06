import { expect, test } from "bun:test"
import { ReversiErrorInvalidPosition } from "@/errors"
import { toPositionFromReversiInput } from "@/position/to-position-from-reversi-input"

test("converts notation string to position", () => {
  const pos = toPositionFromReversiInput("D3")
  expect(pos).not.toBeInstanceOf(Error)
  if (!(pos instanceof Error)) {
    expect(pos.row).toBe(2)
    expect(pos.col).toBe(3)
  }
})

test("returns position object as is", () => {
  const input = { row: 2, col: 3 }
  expect(toPositionFromReversiInput(input)).toBe(input)
})

test("returns error for invalid notation", () => {
  expect(toPositionFromReversiInput("Z9")).toBeInstanceOf(
    ReversiErrorInvalidPosition,
  )
})

test("returns error for out-of-range position", () => {
  expect(toPositionFromReversiInput({ row: 8, col: 0 })).toBeInstanceOf(
    ReversiErrorInvalidPosition,
  )
  expect(toPositionFromReversiInput({ row: -1, col: 0 })).toBeInstanceOf(
    ReversiErrorInvalidPosition,
  )
})

test("returns error for non-integer position", () => {
  expect(toPositionFromReversiInput({ row: 1.5, col: 0 })).toBeInstanceOf(
    ReversiErrorInvalidPosition,
  )
})
