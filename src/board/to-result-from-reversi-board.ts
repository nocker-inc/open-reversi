import { toCountFromReversiBoard } from "@/board/to-count-from-reversi-board"
import type { ReversiBoard, ReversiResult } from "@/types"

export function toResultFromReversiBoard(board: ReversiBoard): ReversiResult {
  const blackCount = toCountFromReversiBoard(board, "black")

  const whiteCount = toCountFromReversiBoard(board, "white")

  const winner =
    blackCount > whiteCount
      ? "black"
      : whiteCount > blackCount
        ? "white"
        : "draw"

  return { winner, blackCount, whiteCount }
}
