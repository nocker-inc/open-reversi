import { ReversiEngine } from "@/engine"
import { ReversiErrorCellOccupied } from "@/errors"

const game = new ReversiEngine()
const after = game.place("D3")
if (after instanceof Error) {
  process.exit(1)
}

const error = after.place("D3")
if (error instanceof ReversiErrorCellOccupied) {
  console.log("=== Rich ===")
  console.log(error.message)
  console.log()
  console.log("=== Plain ===")
  console.log(error.toPlain())
}
