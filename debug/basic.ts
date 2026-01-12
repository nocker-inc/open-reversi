import { ReversiEngine } from "@/engine"
import { print } from "@/print"

const game = new ReversiEngine()

const after = game.place("D3")
if (after instanceof Error) {
  process.exit(1)
}

console.log(print(after.board))

console.log(after.validPlacesNotation)
