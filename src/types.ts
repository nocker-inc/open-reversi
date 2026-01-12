export type ReversiCell = "empty" | "black" | "white"

export type ReversiPosition = {
  readonly row: number
  readonly col: number
}

export type ReversiPositionInput = ReversiPosition | string

export type ReversiBoard = ReadonlyArray<ReadonlyArray<ReversiCell>>

export type ReversiPlayer = "black" | "white"

export type ReversiResult = {
  readonly winner: ReversiPlayer | "draw"
  readonly blackCount: number
  readonly whiteCount: number
}

export type ReversiState = {
  readonly board: ReversiBoard
  readonly currentPlayer: ReversiPlayer
  readonly isGameOver: boolean
}
