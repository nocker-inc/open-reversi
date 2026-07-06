# @nocker-inc/reversi

リバーシを実装する為のエンジン。

## 使い方

```ts
import { ReversiEngine, print } from "@nocker-inc/reversi"

const game = new ReversiEngine()

console.log(print(game.board))
//   A B C D E F G H
// 1 . . . . . . . .
// 2 . . . . . . . .
// 3 . . . . . . . .
// 4 . . . ○ ● . . .
// 5 . . . ● ○ . . .
// 6 . . . . . . . .
// 7 . . . . . . . .
// 8 . . . . . . . .

console.log(game.validPlacesNotation) // ["D3", "C4", "F5", "E6"]

const next = game.place("D3")
if (next instanceof Error) {
  console.log(next.message)
} else {
  console.log(print(next.board))
}
```

## API

### ReversiEngine

ゲームのメインクラス。

```ts
const game = new ReversiEngine()
```

### game.board

現在の盤面。8x8の二次元配列で、各セルは `"black"`, `"white"`, `"empty"` のいずれか。

```ts
game.board[3][3] // "white"
```

### game.currentPlayer

現在の手番。`"black"` または `"white"`。

```ts
game.currentPlayer // "black"
```

### game.isGameOver

ゲームが終了したかどうか。

```ts
game.isGameOver // false
```

### game.validPlaces

有効な手の配列。各要素は `{ row, col }` 形式。

```ts
game.validPlaces // [{ row: 2, col: 3 }, { row: 3, col: 2 }, ...]
```

### game.validPlacesNotation

有効な手の配列。各要素は `"D3"` のような標準表記。

```ts
game.validPlacesNotation // ["D3", "C4", "F5", "E6"]
```

### game.isPassRequired

現在の手番にパスが必要かどうか。有効な手がなく、かつゲームが終了していない場合に `true`。

```ts
if (game.isPassRequired) {
  const next = game.pass()
}
```

### game.history

全状態の履歴。古い順に並んだ配列。

```ts
game.history // [initialGame, afterMove1, afterMove2, ...]
game.history.length // 手数 + 1
```

### game.place(input)

駒を置く。標準表記 (`"D3"`) または `{ row, col }` 形式で指定。成功すると新しい `ReversiEngine` を返す。不正な表記や盤面の範囲外の座標はエラーを返す。

手を打つと手番は必ず相手に渡る。相手に有効な手がない場合は、相手が `pass()` を呼ぶ必要がある。

```ts
const next = game.place("D3")
const next = game.place({ row: 2, col: 3 })
```

### game.pass()

パスする。有効な手がない場合のみ可能。パスは自動処理されないため、`isPassRequired` を確認して明示的に呼び出す。

```ts
const next = game.pass()
```

### game.undo()

1手戻す。履歴がない場合はエラーを返す。

```ts
const prev = game.undo()
```

### game.getCount(player)

指定したプレイヤーの駒数を取得。

```ts
game.getCount("black") // 2
game.getCount("white") // 2
```

### game.getResult()

勝敗を取得。`blackCount`, `whiteCount`, `winner` を含むオブジェクトを返す。

```ts
game.getResult() // { blackCount: 2, whiteCount: 2, winner: "draw" }
```

### print(board)

盤面を文字列に変換する。

```ts
console.log(print(game.board))
//   A B C D E F G H
// 1 . . . . . . . .
// ...
```

### エラー

エラーはthrowされずに返却される。`toPlain()` でANSIコードなしの文字列を取得可能。

```ts
const result = game.place("A1")
if (result instanceof Error) {
  console.log(result.toPlain())
}
```

| コード | クラス | 内容 |
| --- | --- | --- |
| E001 | `ReversiErrorGameOver` | ゲームが既に終了している |
| E002 | `ReversiErrorCellOccupied` | セルが既に埋まっている |
| E003 | `ReversiErrorNoFlip` | ひっくり返せる駒がない |
| E004 | `ReversiErrorCannotPass` | 有効な手があるのにパスした |
| E005 | `ReversiErrorNoHistory` | undoする履歴がない |
| E006 | `ReversiErrorInvalidPosition` | 不正な表記または範囲外の座標 |
