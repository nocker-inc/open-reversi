import { toPositionFromReversiNotation } from "@/position/to-position-from-reversi-notation"
import type { ReversiPosition, ReversiPositionInput } from "@/types"

export function toPositionFromReversiInput(
  input: ReversiPositionInput,
): ReversiPosition {
  if (typeof input === "string") {
    return toPositionFromReversiNotation(input)
  }

  return input
}
