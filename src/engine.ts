import { toCountFromReversiBoard } from "@/board/to-count-from-reversi-board"
import { toResultFromReversiBoard } from "@/board/to-result-from-reversi-board"
import { toValidMovesFromReversiBoard } from "@/board/to-valid-moves-from-reversi-board"
import type { ReversiError } from "@/errors"
import { ReversiErrorNoHistory } from "@/errors"
import { toNotationFromReversiPosition } from "@/position/to-notation-from-reversi-position"
import { toPositionFromReversiInput } from "@/position/to-position-from-reversi-input"
import { applyMoveToReversiState } from "@/state/apply-move-to-reversi-state"
import { applyPassToReversiState } from "@/state/apply-pass-to-reversi-state"
import { createReversiState } from "@/state/create-reversi-state"
import type {
  ReversiBoard,
  ReversiPlayer,
  ReversiPosition,
  ReversiPositionInput,
  ReversiResult,
  ReversiState,
} from "@/types"

export class ReversiEngine {
  readonly board: ReversiBoard

  readonly currentPlayer: ReversiPlayer

  readonly isGameOver: boolean

  readonly previous: ReversiEngine | undefined

  constructor(state?: ReversiState, previous?: ReversiEngine) {
    const initial = state ?? createReversiState()
    this.board = initial.board
    this.currentPlayer = initial.currentPlayer
    this.isGameOver = initial.isGameOver
    this.previous = previous
    Object.freeze(this)
  }

  get validPlaces(): ReadonlyArray<ReversiPosition> {
    return toValidMovesFromReversiBoard(this.board, this.currentPlayer)
  }

  get validPlacesNotation(): ReadonlyArray<string> {
    return this.validPlaces.map(toNotationFromReversiPosition)
  }

  get history(): ReadonlyArray<ReversiEngine> {
    const result: ReversiEngine[] = []
    let current: ReversiEngine | undefined = this
    while (current !== undefined) {
      result.unshift(current)
      current = current.previous
    }
    return result
  }

  place(input: ReversiPositionInput): ReversiEngine | ReversiError {
    const position = toPositionFromReversiInput(input)
    const result = applyMoveToReversiState({
      state: this.toState(),
      position,
    })

    if (result instanceof Error) {
      return result
    }

    return new ReversiEngine(result, this)
  }

  pass(): ReversiEngine | ReversiError {
    const result = applyPassToReversiState({ state: this.toState() })

    if (result instanceof Error) {
      return result
    }

    return new ReversiEngine(result, this)
  }

  undo(): ReversiEngine | ReversiErrorNoHistory {
    if (this.previous === undefined) {
      return new ReversiErrorNoHistory()
    }

    return this.previous
  }

  getCount(player: ReversiPlayer): number {
    return toCountFromReversiBoard(this.board, player)
  }

  getResult(): ReversiResult {
    return toResultFromReversiBoard(this.board)
  }

  private toState(): ReversiState {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      isGameOver: this.isGameOver,
    }
  }
}
