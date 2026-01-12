import { getReversiFlippablePositions } from "@/board/get-reversi-flippable-positions"
import { toValidMovesFromReversiBoard } from "@/board/to-valid-moves-from-reversi-board"
import { updateReversiBoard } from "@/board/update-reversi-board"
import {
  ReversiErrorCellOccupied,
  ReversiErrorGameOver,
  ReversiErrorNoFlip,
} from "@/errors"
import { toggleReversiPlayer } from "@/player/toggle-reversi-player"
import type { ReversiPosition, ReversiState } from "@/types"

type ReversiPlaceError =
  | ReversiErrorGameOver
  | ReversiErrorCellOccupied
  | ReversiErrorNoFlip

type Props = {
  state: ReversiState
  position: ReversiPosition
}

export function applyMoveToReversiState(
  props: Props,
): ReversiState | ReversiPlaceError {
  if (props.state.isGameOver) {
    return new ReversiErrorGameOver(props.state.board)
  }

  if (props.state.board[props.position.row][props.position.col] !== "empty") {
    return new ReversiErrorCellOccupied(props.state.board, props.position)
  }

  const flippable = getReversiFlippablePositions({
    board: props.state.board,
    position: props.position,
    player: props.state.currentPlayer,
  })

  if (flippable.length === 0) {
    return new ReversiErrorNoFlip(props.state.board, props.position)
  }

  const newBoard = updateReversiBoard({
    board: props.state.board,
    positions: [props.position, ...flippable],
    cell: props.state.currentPlayer,
  })

  const opponent = toggleReversiPlayer(props.state.currentPlayer)

  const opponentMoves = toValidMovesFromReversiBoard(newBoard, opponent)

  if (opponentMoves.length > 0) {
    return { board: newBoard, currentPlayer: opponent, isGameOver: false }
  }

  const currentPlayerMoves = toValidMovesFromReversiBoard(
    newBoard,
    props.state.currentPlayer,
  )

  if (currentPlayerMoves.length > 0) {
    return {
      board: newBoard,
      currentPlayer: props.state.currentPlayer,
      isGameOver: false,
    }
  }

  return { board: newBoard, currentPlayer: opponent, isGameOver: true }
}
