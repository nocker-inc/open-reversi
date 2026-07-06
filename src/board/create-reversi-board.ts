import { freezeReversiBoard } from "@/board/freeze-reversi-board"
import { REVERSI_BOARD_SIZE } from "@/constants"
import type { ReversiBoard } from "@/types"

export function createReversiBoard(): ReversiBoard {
  const board: ReversiBoard = Array.from(
    { length: REVERSI_BOARD_SIZE },
    (_, row) => {
      return Array.from({ length: REVERSI_BOARD_SIZE }, (_, col) => {
        if ((row === 3 && col === 3) || (row === 4 && col === 4)) {
          return "white"
        }

        if ((row === 3 && col === 4) || (row === 4 && col === 3)) {
          return "black"
        }

        return "empty"
      })
    },
  )

  return freezeReversiBoard(board)
}
