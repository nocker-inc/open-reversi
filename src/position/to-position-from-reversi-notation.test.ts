import { expect, test } from "bun:test"
import { toPositionFromReversiNotation } from "@/position/to-position-from-reversi-notation"

test("parses A1 to row 0, col 0", () => {
  const pos = toPositionFromReversiNotation("A1")
  expect(pos.row).toBe(0)
  expect(pos.col).toBe(0)
})

test("parses D3 to row 2, col 3", () => {
  const pos = toPositionFromReversiNotation("D3")
  expect(pos.row).toBe(2)
  expect(pos.col).toBe(3)
})

test("parses H8 to row 7, col 7", () => {
  const pos = toPositionFromReversiNotation("H8")
  expect(pos.row).toBe(7)
  expect(pos.col).toBe(7)
})

test("parses lowercase notation", () => {
  const pos = toPositionFromReversiNotation("d3")
  expect(pos.row).toBe(2)
  expect(pos.col).toBe(3)
})

test("throws error for invalid notation", () => {
  expect(() => toPositionFromReversiNotation("Z9")).toThrow("Invalid notation")
  expect(() => toPositionFromReversiNotation("A0")).toThrow("Invalid notation")
  expect(() => toPositionFromReversiNotation("A9")).toThrow("Invalid notation")
})
