import { toValidMovesFromReversiBoard } from "@/board/to-valid-moves-from-reversi-board"
import { ReversiErrorCannotPass, ReversiErrorGameOver } from "@/errors"
import { toggleReversiPlayer } from "@/player/toggle-reversi-player"
import type { ReversiState } from "@/types"

type ReversiPassError = ReversiErrorGameOver | ReversiErrorCannotPass

type Props = {
  state: ReversiState
}

export function applyPassToReversiState(
  props: Props,
): ReversiState | ReversiPassError {
  if (props.state.isGameOver) {
    return new ReversiErrorGameOver(props.state.board)
  }

  if (
    toValidMovesFromReversiBoard(props.state.board, props.state.currentPlayer)
      .length > 0
  ) {
    return new ReversiErrorCannotPass(props.state.board)
  }

  const opponent = toggleReversiPlayer(props.state.currentPlayer)

  const opponentMoves = toValidMovesFromReversiBoard(
    props.state.board,
    opponent,
  )

  if (opponentMoves.length === 0) {
    return {
      board: props.state.board,
      currentPlayer: opponent,
      isGameOver: true,
    }
  }

  return {
    board: props.state.board,
    currentPlayer: opponent,
    isGameOver: false,
  }
}
