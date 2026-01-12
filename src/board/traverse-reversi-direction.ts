import { REVERSI_BOARD_SIZE } from "@/constants"
import type { ReversiBoard, ReversiCell, ReversiPosition } from "@/types"

type Props = {
  board: ReversiBoard
  row: number
  col: number
  direction: ReversiPosition
  target: ReversiCell
  stop: ReversiCell
  candidates: ReadonlyArray<ReversiPosition>
}

export function traverseReversiDirection(
  props: Props,
): ReadonlyArray<ReversiPosition> {
  if (
    props.row < 0 ||
    props.row >= REVERSI_BOARD_SIZE ||
    props.col < 0 ||
    props.col >= REVERSI_BOARD_SIZE
  ) {
    return []
  }

  const cell = props.board[props.row][props.col]

  if (cell === props.target) {
    return traverseReversiDirection({
      board: props.board,
      row: props.row + props.direction.row,
      col: props.col + props.direction.col,
      direction: props.direction,
      target: props.target,
      stop: props.stop,
      candidates: [...props.candidates, { row: props.row, col: props.col }],
    })
  }

  if (cell === props.stop) {
    return props.candidates
  }

  return []
}
