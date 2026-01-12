import type { ReversiBoard } from "@/types"

export function print(board: ReversiBoard): string {
  const lines: string[] = []

  lines.push("  A B C D E F G H")

  for (let row = 0; row < board.length; row++) {
    const cells: string[] = []
    for (let col = 0; col < board[row].length; col++) {
      const cell = board[row][col]
      if (cell === "empty") {
        cells.push(".")
      } else if (cell === "black") {
        cells.push("●")
      } else {
        cells.push("○")
      }
    }
    lines.push(`${row + 1} ${cells.join(" ")}`)
  }

  return lines.join("\n")
}
