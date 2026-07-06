import { ReversiErrorInvalidPosition } from "@/errors"
import type { ReversiPosition } from "@/types"

export function toPositionFromReversiNotation(
  notation: string,
): ReversiPosition | ReversiErrorInvalidPosition {
  const match = notation.match(/^([A-Ha-h])([1-8])$/)

  if (!match) {
    return new ReversiErrorInvalidPosition(notation)
  }

  const col = match[1].toUpperCase().charCodeAt(0) - "A".charCodeAt(0)
  const row = Number.parseInt(match[2], 10) - 1

  return { row, col }
}
