import type { ReversiBoard } from "@/types"

export function freezeReversiBoard(board: ReversiBoard): ReversiBoard {
  return Object.freeze(board.map((row) => Object.freeze([...row])))
}
