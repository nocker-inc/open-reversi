import type { ReversiPlayer } from "@/types"

export function toggleReversiPlayer(player: ReversiPlayer): ReversiPlayer {
  if (player === "black") {
    return "white"
  }

  return "black"
}
