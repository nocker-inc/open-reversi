- @./package.json

## Overview

UIを持たないヘッドレスリバーシエンジン。イミュータブルな設計で、ゲームロジックのみを提供する。

## Directory Structure

- `src/board/` - 盤面操作 (作成、更新、有効手計算、駒カウントなど)
- `src/player/` - プレイヤー操作 (手番切り替え)
- `src/position/` - 座標変換 (A1表記とrow/col変換)
- `src/state/` - ゲーム状態管理 (手を打つ、パス)
- `src/engine.ts` - メインクラス (ReversiEngine)
- `src/errors.ts` - エラークラス (リッチな表示付き)
- `src/print.ts` - 盤面の文字列表示
- `debug/` - デバッグ用スクリプト

## Tech Stack

- TypeScript
- Bun (テスト実行)
- tsdown (ビルド)
- Biome (フォーマット)

## Architecture

- 1ファイル1関数/クラス
- イミュータブル設計 (Object.freeze、board/stateはdeep freeze)
- 関数コア + クラスファサードパターン
- エラーはthrowせずT | Errorを返却
- propsオブジェクトパターン (引数3つ以上の場合)
- 明示パス方式 (手を打つと手番は必ず相手に渡る。パスは自動処理せず、`isPassRequired` を確認して `pass()` を呼ぶ)
