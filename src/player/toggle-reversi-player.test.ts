import { expect, test } from "bun:test"
import { toggleReversiPlayer } from "@/player/toggle-reversi-player"

test("toggles black to white", () => {
  expect(toggleReversiPlayer("black")).toBe("white")
})

test("toggles white to black", () => {
  expect(toggleReversiPlayer("white")).toBe("black")
})
