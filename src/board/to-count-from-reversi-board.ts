import type { ReversiBoard, ReversiPlayer } from "@/types"

export function toCountFromReversiBoard(
  board: ReversiBoard,
  player: ReversiPlayer,
): number {
  return board.flat().filter((cell) => cell === player).length
}
