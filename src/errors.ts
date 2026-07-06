import type { ReversiBoard, ReversiPosition } from "@/types"

type FormatProps = {
  code: string
  message: string
  board: ReversiBoard
  position?: ReversiPosition
  plain?: boolean
}

function createColors(plain: boolean) {
  if (plain) {
    return { red: "", yellow: "", cyan: "", gray: "", bold: "", reset: "" }
  }
  return {
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
    bold: "\x1b[1m",
    reset: "\x1b[0m",
  }
}

function formatReversiError(props: FormatProps): string {
  const color = createColors(props.plain ?? false)
  const lines: string[] = []

  const errorLabel = `${color.bold}${color.red}error[${props.code}]${color.reset}`
  const message = `${color.bold}${props.message}${color.reset}`
  lines.push(`${errorLabel}: ${message}`)

  if (props.position) {
    const col = String.fromCharCode("A".charCodeAt(0) + props.position.col)
    const row = props.position.row + 1
    lines.push(
      `  ${color.cyan}-->${color.reset} ${color.bold}${col}${row}${color.reset}`,
    )
  }

  const pipe = `${color.gray}|${color.reset}`
  lines.push(`   ${pipe}`)
  lines.push(`   ${pipe}    ${color.gray}A B C D E F G H${color.reset}`)

  for (let row = 0; row < props.board.length; row++) {
    const cells: string[] = []
    for (let col = 0; col < props.board[row].length; col++) {
      const cell = props.board[row][col]
      const isTarget =
        props.position?.row === row && props.position?.col === col

      if (isTarget) {
        cells.push(`${color.yellow}*${color.reset}`)
      } else if (cell === "empty") {
        cells.push(`${color.gray}.${color.reset}`)
      } else if (cell === "black") {
        cells.push("●")
      } else {
        cells.push("○")
      }
    }

    const rowNum = row + 1
    const isTargetRow = props.position?.row === row
    const marker = isTargetRow ? ` ${color.yellow}<--${color.reset}` : ""
    lines.push(
      `   ${pipe}  ${color.gray}${rowNum}${color.reset} ${cells.join(" ")}${marker}`,
    )
  }

  lines.push(`   ${pipe}`)

  return lines.join("\n")
}

export class ReversiErrorGameOver extends Error {
  readonly board: ReversiBoard

  constructor(board: ReversiBoard) {
    const formatted = formatReversiError({
      code: "E001",
      message: "Game is already over",
      board,
    })
    super(formatted)
    this.name = "ReversiErrorGameOver"
    this.board = board
  }

  toPlain(): string {
    return formatReversiError({
      code: "E001",
      message: "Game is already over",
      board: this.board,
      plain: true,
    })
  }
}

export class ReversiErrorCellOccupied extends Error {
  readonly board: ReversiBoard
  readonly position: ReversiPosition

  constructor(board: ReversiBoard, position: ReversiPosition) {
    const formatted = formatReversiError({
      code: "E002",
      message: "Cell is already occupied",
      board,
      position,
    })
    super(formatted)
    this.name = "ReversiErrorCellOccupied"
    this.board = board
    this.position = position
  }

  toPlain(): string {
    return formatReversiError({
      code: "E002",
      message: "Cell is already occupied",
      board: this.board,
      position: this.position,
      plain: true,
    })
  }
}

export class ReversiErrorNoFlip extends Error {
  readonly board: ReversiBoard
  readonly position: ReversiPosition

  constructor(board: ReversiBoard, position: ReversiPosition) {
    const formatted = formatReversiError({
      code: "E003",
      message: "No pieces can be flipped",
      board,
      position,
    })
    super(formatted)
    this.name = "ReversiErrorNoFlip"
    this.board = board
    this.position = position
  }

  toPlain(): string {
    return formatReversiError({
      code: "E003",
      message: "No pieces can be flipped",
      board: this.board,
      position: this.position,
      plain: true,
    })
  }
}

export class ReversiErrorCannotPass extends Error {
  readonly board: ReversiBoard

  constructor(board: ReversiBoard) {
    const formatted = formatReversiError({
      code: "E004",
      message: "Cannot pass when valid moves exist",
      board,
    })
    super(formatted)
    this.name = "ReversiErrorCannotPass"
    this.board = board
  }

  toPlain(): string {
    return formatReversiError({
      code: "E004",
      message: "Cannot pass when valid moves exist",
      board: this.board,
      plain: true,
    })
  }
}

export class ReversiErrorInvalidPosition extends Error {
  readonly input: string

  constructor(input: string) {
    super(`error[E006]: Invalid position: ${input}`)
    this.name = "ReversiErrorInvalidPosition"
    this.input = input
  }

  toPlain(): string {
    return this.message
  }
}

export class ReversiErrorNoHistory extends Error {
  constructor() {
    super("error[E005]: No previous state to undo")
    this.name = "ReversiErrorNoHistory"
  }

  toPlain(): string {
    return "error[E005]: No previous state to undo"
  }
}

export type ReversiError =
  | ReversiErrorGameOver
  | ReversiErrorCellOccupied
  | ReversiErrorNoFlip
  | ReversiErrorCannotPass
  | ReversiErrorInvalidPosition
  | ReversiErrorNoHistory
