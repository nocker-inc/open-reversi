import { expect, test } from "bun:test"
import { toNotationFromReversiPosition } from "@/position/to-notation-from-reversi-position"

test("converts row 0, col 0 to A1", () => {
  expect(toNotationFromReversiPosition({ row: 0, col: 0 })).toBe("A1")
})

test("converts row 2, col 3 to D3", () => {
  expect(toNotationFromReversiPosition({ row: 2, col: 3 })).toBe("D3")
})

test("converts row 7, col 7 to H8", () => {
  expect(toNotationFromReversiPosition({ row: 7, col: 7 })).toBe("H8")
})
