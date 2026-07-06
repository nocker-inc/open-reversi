import { REVERSI_BOARD_SIZE } from "@/constants"
import type { ReversiPosition } from "@/types"

export function isValidReversiPosition(position: ReversiPosition): boolean {
  return (
    Number.isInteger(position.row) &&
    Number.isInteger(position.col) &&
    position.row >= 0 &&
    position.row < REVERSI_BOARD_SIZE &&
    position.col >= 0 &&
    position.col < REVERSI_BOARD_SIZE
  )
}
