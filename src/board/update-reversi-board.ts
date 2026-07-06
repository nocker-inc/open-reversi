import { freezeReversiBoard } from "@/board/freeze-reversi-board"
import type { ReversiBoard, ReversiCell, ReversiPosition } from "@/types"

type Props = {
  board: ReversiBoard
  positions: ReadonlyArray<ReversiPosition>
  cell: ReversiCell
}

export function updateReversiBoard(props: Props): ReversiBoard {
  const positionSet = new Set(
    props.positions.map((position) => `${position.row},${position.col}`),
  )

  const board = props.board.map((row, rowIndex) => {
    return row.map((currentCell, colIndex) => {
      return positionSet.has(`${rowIndex},${colIndex}`)
        ? props.cell
        : currentCell
    })
  })

  return freezeReversiBoard(board)
}
