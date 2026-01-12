import type { ReversiPosition } from "@/types"

export const REVERSI_BOARD_SIZE = 8

export const REVERSI_DIRECTIONS: ReadonlyArray<ReversiPosition> = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
]

export const REVERSI_ALL_POSITIONS: ReadonlyArray<ReversiPosition> = Array.from(
  { length: REVERSI_BOARD_SIZE },
  (_, row) => {
    return Array.from({ length: REVERSI_BOARD_SIZE }, (_, col) => {
      return { row, col }
    })
  },
).flat()
