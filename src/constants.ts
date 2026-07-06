import type { ReversiPosition } from "@/types"

export const REVERSI_BOARD_SIZE = 8

export const REVERSI_DIRECTIONS: ReadonlyArray<ReversiPosition> = Object.freeze(
  [
    Object.freeze({ row: -1, col: -1 }),
    Object.freeze({ row: -1, col: 0 }),
    Object.freeze({ row: -1, col: 1 }),
    Object.freeze({ row: 0, col: -1 }),
    Object.freeze({ row: 0, col: 1 }),
    Object.freeze({ row: 1, col: -1 }),
    Object.freeze({ row: 1, col: 0 }),
    Object.freeze({ row: 1, col: 1 }),
  ],
)

export const REVERSI_ALL_POSITIONS: ReadonlyArray<ReversiPosition> =
  Object.freeze(
    Array.from({ length: REVERSI_BOARD_SIZE }, (_, row) => {
      return Array.from({ length: REVERSI_BOARD_SIZE }, (_, col) => {
        return Object.freeze({ row, col })
      })
    }).flat(),
  )
