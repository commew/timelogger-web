# 基本方針

本プロジェクトは [Next.js](https://nextjs.org/) を利用しています。

[Next.js 13 から有効になった app directory](https://nextjs.org/blog/next-13) は利用していません。

理由としてはまだ Beta 版なのと、[Next.js](https://nextjs.org/) が初めてのメンバーも多いので今回は利用すべきではないという判断をしています。

Component の作成は [Mantine](https://mantine.dev/pages/getting-started/) を利用しています。

アトミックデザインの用語が出てきますが、アトミックデザインに準拠している訳ではありません。

# ディレクトリ構成について

各ディレクトリの役割について記載します。

まだまだ発展途上のアプリケーションなので、今後もより良い形にリファクタリングを継続していきます。

# `src` 以下のディレクトリ

## `index.ts` の作成について

各ディレクトリ毎に `index.ts` を作成して、そこから外のディレクトリに公開したい関数や型定義だけを export するようにします。

これは export の範囲を限定可する事でリファクタリング時の影響範囲を小さくする事が主な目的です。

ただし例外的に `src/pages/` に関しては Next.js のルール上、ここに置かれた物がそのままルーティングとして解釈されてしまうので `index.ts` の配置は行いません。

## `export default` について

以下の記事にもありますが、主にリファクタリング面や IDE のサポート面で不利になる可能性があるので `export default` を利用しない方針とします。

- [なぜ default export を使うべきではないのか？](https://engineering.linecorp.com/ja/blog/you-dont-need-default-export/)
- [Avoid Export Default](https://typescript-jp.gitbook.io/deep-dive/main-1/defaultisbad)

## components

純粋な関数型 Component を格納する為のディレクトリです。

出来る限り `props` にのみ依存する Component になるのが理想です。

Component の内部で React hooks を利用する事は問題ありません。

また Component は [Mantine](https://mantine.dev/pages/getting-started/) で作成しているので [Mantine](https://mantine.dev/pages/getting-started/) にも依存しています。

一部 `next/image` に依存しているものも存在します。

Component 名と同様のディレクトリ名を作成して `index.ts` を使って外部公開が必要な Component だけを export するようにします。

## api

API に通信を行う関数を格納します。

現状は `src/api/fetch/` しか存在しませんが `fetch` の部分には HTTP クライアントが入ります。

実装する際は `features/` 配下に関数のインターフェースを実装して、それを利用する形で実装します。

## constants

アプリケーション全体で利用する定数を格納します。

定数なので演算処理などを入れないようにします。

また外部ライブラリには依存せずに、順数な TypeScript のオブジェクト、または関数として実装します。

## features

[bulletproof-react](https://github.com/alan2207/bulletproof-react) のように `features` の配下に `components` や `api` などをまとめる設計もありますが、本プリケーションはそれほど機能が多い訳ではないので、本アプリケーションにおける `features` の役割はあくまでも コアとなるビジネスロジックを格納する為のディレクトリです。

ドメイン駆動設計のパターンを全て踏襲している訳ではありません。

`src/api/` で実装する API 接続用関数のインターフェースやビジネスロジック上重要な関数や型定義などを実装します。

また外部ライブラリには依存せずに、順数な TypeScript のオブジェクト、または関数として実装します。

### features/errors

ビジネス上意味のあるエラーオブジェクトを定義します。

TypeScript の汎用エラーは使わずに何のエラーなのか分かりやすい名前をつけます。

## hooks

独自定義した Custom Hooks を格納します。

`features` の機能に一部依存しています。

## layouts

レイアウト用の Component を格納します。

## openapi

OpenAPI で定義したスキーマを TypeScript に変換したものを格納します。

このディレクトリ内には `src/openapi/schema.ts` というファイルのみが存在します。

`npm run generate:schema` で自動生成されたファイルなので Linter によるチェックや Formatter での整形の対象外となっています。

ファイルの性質上、同一ディレクトリ内に `index.ts` の配置も行いません。

## pages

Next.js の page 用 Component を格納します。

Next.js に依存する処理以外は極力書かずに、その他の層に処理を移譲するように意識します。

## templates

アトミックデザインで言うところの `Templates` が格納されます。

アトミックデザインから用語を拝借しましたが、本プロジェクトではアトミックデザインに準拠している訳ではありません。

`pages` からはここに定義されている `Templates` Component を利用します。

Package 利用者側が利用方法を理解出来る程度に Storybook も厚めに作成する必要があります。

## types

各 Component で共通利用する型定義を格納します。

Package の利用者にとっても重要な情報になるので、一部の型定義は Package 外にも公開されています。

## utils

ちょっとした便利機能を格納します。

ただしここには本当にビジネスロジック上意味を持たない、どのようなアプリケーションでも利用するような汎用的な機能だけを格納するようにお願いします。

`utils` への機能追加を行う前に `features` に定義出来ないか検討を行うようにお願いします。

## その他

### テストコード

各ディレクトリの同階層に `__tests__` ディレクトリを作成し、その中にテストコード用のファイルを作成します。

### Storybook

「Component 名」 + `.stories.tsx` で命名します。

UI デザイナーチームとの連携の為、Storybook の重要度は高くなっています。
