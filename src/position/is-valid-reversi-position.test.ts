import { expect, test } from "bun:test"
import { isValidReversiPosition } from "@/position/is-valid-reversi-position"

test("returns true for positions inside the board", () => {
  expect(isValidReversiPosition({ row: 0, col: 0 })).toBe(true)
  expect(isValidReversiPosition({ row: 7, col: 7 })).toBe(true)
  expect(isValidReversiPosition({ row: 3, col: 4 })).toBe(true)
})

test("returns false for positions outside the board", () => {
  expect(isValidReversiPosition({ row: -1, col: 0 })).toBe(false)
  expect(isValidReversiPosition({ row: 0, col: -1 })).toBe(false)
  expect(isValidReversiPosition({ row: 8, col: 0 })).toBe(false)
  expect(isValidReversiPosition({ row: 0, col: 8 })).toBe(false)
  expect(isValidReversiPosition({ row: 99, col: 99 })).toBe(false)
})

test("returns false for non-integer positions", () => {
  expect(isValidReversiPosition({ row: 1.5, col: 0 })).toBe(false)
  expect(isValidReversiPosition({ row: 0, col: Number.NaN })).toBe(false)
  expect(
    isValidReversiPosition({ row: Number.POSITIVE_INFINITY, col: 0 }),
  ).toBe(false)
})
