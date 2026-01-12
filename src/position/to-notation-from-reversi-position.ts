import type { ReversiPosition } from "@/types"

export function toNotationFromReversiPosition(
  position: ReversiPosition,
): string {
  const col = String.fromCharCode("A".charCodeAt(0) + position.col)
  const row = position.row + 1
  return `${col}${row}`
}
