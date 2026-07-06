import { ReversiErrorInvalidPosition } from "@/errors"
import { isValidReversiPosition } from "@/position/is-valid-reversi-position"
import { toPositionFromReversiNotation } from "@/position/to-position-from-reversi-notation"
import type { ReversiPosition, ReversiPositionInput } from "@/types"

export function toPositionFromReversiInput(
  input: ReversiPositionInput,
): ReversiPosition | ReversiErrorInvalidPosition {
  if (typeof input === "string") {
    return toPositionFromReversiNotation(input)
  }

  if (!isValidReversiPosition(input)) {
    return new ReversiErrorInvalidPosition(
      `(row: ${input.row}, col: ${input.col})`,
    )
  }

  return input
}
