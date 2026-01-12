import type { ReversiBoard, ReversiCell, ReversiPosition } from "@/types"

type Props = {
  board: ReversiBoard
  positions: ReadonlyArray<ReversiPosition>
  cell: ReversiCell
}

export function updateReversiBoard(props: Props): ReversiBoard {
  const positionSet = new Set(props.positions.map((p) => `${p.row},${p.col}`))

  return props.board.map((row, rowIndex) => {
    return row.map((currentCell, colIndex) => {
      return positionSet.has(`${rowIndex},${colIndex}`)
        ? props.cell
        : currentCell
    })
  })
}
