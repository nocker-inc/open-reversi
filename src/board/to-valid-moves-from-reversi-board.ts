import { getReversiFlippablePositions } from "@/board/get-reversi-flippable-positions"
import { REVERSI_ALL_POSITIONS } from "@/constants"
import type { ReversiBoard, ReversiPlayer, ReversiPosition } from "@/types"

export function toValidMovesFromReversiBoard(
  board: ReversiBoard,
  player: ReversiPlayer,
): ReadonlyArray<ReversiPosition> {
  return REVERSI_ALL_POSITIONS.filter((position) => {
    return (
      board[position.row][position.col] === "empty" &&
      getReversiFlippablePositions({ board, position, player }).length > 0
    )
  })
}
