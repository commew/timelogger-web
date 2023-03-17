# timelogger-web

[![ci](https://github.com/commew/timelogger-web/actions/workflows/ci.yml/badge.svg)](https://github.com/commew/timelogger-web/actions/workflows/ci.yml)
[![chromatic](https://github.com/commew/timelogger-web/actions/workflows/chromatic.yml/badge.svg)](https://github.com/commew/timelogger-web/actions/workflows/chromatic.yml)

## Getting Started

必要な環境変数を `.env` に設定します。

```
GOOGLE_OIDC_CLIENT_ID=GoogleのOpenIDConnectのクライアントID
GOOGLE_OIDC_CLIENT_SECRET=GoogleのOpenIDConnectのクライアントシークレット
NEXTAUTH_URL=http://localhost:5656
NEXTAUTH_SECRET=十分に長い文字列
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=設定は必須ではないですがGA等のデバッグを行いたい場合はVercelの値を参照
NEXT_PUBLIC_APP_URL=http://localhost:5656
```
