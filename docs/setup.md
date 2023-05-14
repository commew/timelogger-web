# ローカル開発環境構築手順

コントリビューター向けの開発環境構築手順です。

Windows でも環境構築は可能ですが、このドキュメントは Mac OS 向けに書かれています。

## Node.js のインストール

18 系の最新を利用して下さい。

複数プロジェクトで異なる Node.js のバージョンを利用する可能性があるので、Node.js 自体をバージョン管理出来るようにしておくのが無難です。

以下は [asdf](https://asdf-vm.com) を使った設定例です。

```bash
asdf install nodejs 18.15.0

asdf local nodejs 18.15.0
```

もちろん他のバージョン管理ツールを使っても問題ありません。

18 系を利用と曖昧な表記にしているのは本アプリケーションをホスティングしている [Vercel](https://vercel.com) が利用している Node.js のバージョンが 18 系だからです。

18 系というだけでどのマイナーバージョンを利用しているか明確な記述がないので、18 系の最新を利用しておくという対応を行っています。

## 依存 package のインストール

`node -v` で目的のバージョンが表示されるようになったら、以下を実行して下さい。

`npm ci` で依存 package をインストールします。

## 環境変数の設定

プロジェクトルートに `.env` を以下の内容で配置して下さい。

```
GOOGLE_OIDC_CLIENT_ID=GoogleのOpenIDConnectのクライアントID
GOOGLE_OIDC_CLIENT_SECRET=GoogleのOpenIDConnectのクライアントシークレット
NEXTAUTH_URL=http://localhost:5656
NEXTAUTH_SECRET=十分に長い文字列
BACKEND_API_BASE_URL=http://127.0.0.1:5757
API_BASIC_AUTH_USER=Vercelの値を参照
API_BASIC_AUTH_PASSWORD=Vercelの値を参照
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=設定は必須ではないですがGA等のデバッグを行いたい場合はVercelの値を参照
NEXT_PUBLIC_APP_URL=http://localhost:5656
```

一部の環境変数は機密情報になるのでドキュメントに直接記載する事は出来ませんので、[Vercel の環境変数設定](https://vercel.com/commew/timelogger-web/settings/environment-variables) を直接参照して下さい。

### 手動で環境変数を設定するのが面倒な場合

`vercel` command を利用可能な状態であれば `vercel env pull .env.local` を実行する事でローカルの `.env` に環境変数を展開出来ます。

- https://vercel.com/docs/cli
- https://nextjs-ja-translation-docs.vercel.app/docs/basic-features/environment-variables

## 開発用サーバーの起動

`npm run dev` を実行します。

以下の URL でアクセスが可能です。

http://localhost:5656

# npm script の説明

## Build

`npm run build` で Next.js の Build コマンドを実行します。

ローカルでの開発時は使う機会は少ないですが、この Build が通らない場合は CI に失敗するようになっています。

## Start

`npm run start` で Build されたソースコードを元にサーバーを起動します。

[Vercel](https://vercel.com) 上でもこのコマンドで起動したアプリケーションサーバーが実行されています。

ホットリロードが効かないのでローカル開発ではあまり使う機会はありません。

## Linter

`npm run lint` で Linter を実行します。

ここでエラーが残っている場合は CI が通らないようになっています。

## Formatter

`npm run format` でソースコードのフォーマットを実行します。

Linter のエラーはこちらのコマンドである程度自動修正が可能です。

## Test

`npm run test` でテストコードを実行します。

## Storybook の起動

`npm run storybook` を実行します。

`http://localhost:6006` でアクセス出来ます。

Component の動作確認は基本的にこの Storybook 上で行います。

## Storybook を静的な HTML ファイルとしてアウトプットする

以下のコマンドを実行します。

```bash
npm run build-storybook
```

`storybook-static/` に HTML ファイルが吐き出されている事を確認出来ます。

`index.html` をブラウザで開くと Storybook を確認する事が出来ます。

ちなみにコミット毎に [chromatic](https://www.chromatic.com/builds?appId=63d52217f1430a5ad69846cd) にデプロイが行われるようになっています。

README にも記載がありますが、以下の URL から最新の Storybook を確認出来ます。

https://main--63d52217f1430a5ad69846cd.chromatic.com

## OpenAPI の MockServer を起動する

以下のコマンドで `5757` ポートで起動します。

```bash
npm run api-mock:start
```

以下は `curl` コマンドでのリクエスト例です。

````bash

```bash
curl -v \
-X POST \
-H "Prefer: code=201, example=ExampleSuccess" \
-H "Content-Type: application/json" \
-H "Authorization: Basic YWRtaW5Vc2VyOnBhc3N3b3JkMTIzNA==" \
-d '
{
  "sub": "99999999999999999999999999999",
  "provider": "google"
}
' \
http://127.0.0.1:5757/accounts | jq
````

テストコード内では [msw](https://mswjs.io/) で Mock 化していますが、開発時にはこの MockServer を利用する事で実際の API と同じ挙動を確認する事が出来ます。

`Prefer` Header を送信している点に注目して下さい。

この Header を送信することで意図したレスポンス結果を得る事が出来ます。

例えば `POST /accounts` で認証エラーのレスポンスを得る為には以下のようにリクエストを行います。

```bash
curl -v \
-X POST \
-H "Prefer: code=401, example=ExampleUnAuthenticated" \
-H "Content-Type: application/json" \
-H "Authorization: Basic YWRtaW5Vc2VyOnBhc3N3b3JkMTIzNA==" \
-d '
{
  "sub": "99999999999999999999999999999",
  "provider": "google"
}
' \
http://127.0.0.1:5757/accounts | jq
```

詳しくは以下の公式ドキュメントの記述を参照して下さい。

https://meta.stoplight.io/docs/prism/beeaad4dc0227-prism-cli#modifying-responses

## OpenAPI の設定ファイルから型定義を生成する

`npm run generate:schema` というコマンドを実行すると `src/types/schema.ts` に型定義が生成されます。

API 設計で `public/docs/api/openapi.yaml` を変更した場合はこのコマンドを実行して型定義を更新・コミットをお願いします。
