import { createReversiBoard } from "@/board/create-reversi-board"
import type { ReversiState } from "@/types"

export function createReversiState(): ReversiState {
  return Object.freeze({
    board: createReversiBoard(),
    currentPlayer: "black",
    isGameOver: false,
  })
}
