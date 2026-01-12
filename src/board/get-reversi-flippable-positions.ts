import { traverseReversiDirection } from "@/board/traverse-reversi-direction"
import { REVERSI_DIRECTIONS } from "@/constants"
import { toggleReversiPlayer } from "@/player/toggle-reversi-player"
import type { ReversiBoard, ReversiPlayer, ReversiPosition } from "@/types"

type Props = {
  board: ReversiBoard
  position: ReversiPosition
  player: ReversiPlayer
}

export function getReversiFlippablePositions(
  props: Props,
): ReadonlyArray<ReversiPosition> {
  return REVERSI_DIRECTIONS.flatMap((direction) => {
    return traverseReversiDirection({
      board: props.board,
      row: props.position.row + direction.row,
      col: props.position.col + direction.col,
      direction,
      target: toggleReversiPlayer(props.player),
      stop: props.player,
      candidates: [],
    })
  })
}
