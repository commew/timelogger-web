# はじめに

[ローカル開発環境構築手順](https://github.com/commew/timelogger-web/blob/main/docs/setup.md) を参考にローカル PC 上に開発環境を構築してから以降をお読み下さい。

# 開発からリリースまでの流れ

## 1. feature ブランチを作成して機能開発

ブランチの運用ルールですが基本的に [GitHub flow](https://guides.github.com/introduction/flow/) に準拠しています。

まずは feature ブランチを作成して機能開発の準備を行います。

開発が必要な機能は GitHub issue として登録されていますので、それを元にブランチを作成します。

ブランチ名は `feature/issue` + `{GitHubのissue番号}` + `/任意の文字列` のように命名します。

例えば GitHub issue が https://github.com/commew/timelogger-web/issues/13 であれば以下のようになります。

```
git switch -c feature/issue13/add-google-login-button
git switch feature/issue13/add-google-login-button
```

`/add-google-login-button` の部分は任意の文字列です。

1 つの GitHub issue を解決する為に複数の PR を出す事もあるので、このような命名規則になっています。

PR テンプレートに従い必要な応報を入力します。

大きな PR はレビュアーへの負担が大きく、不具合等の見落としが多くなる傾向があるので、ある程度の細かく出す事を推奨しています。

一度に複数の機能を開発しようとすると大きな PR になる事が多いので、1 つの PR で解決する問題は 1 つにする事を意識すると適切な大きさになります。

以下がサンプル PR になります。

- https://github.com/commew/timelogger-web/pull/33
- https://github.com/commew/timelogger-web/pull/34
- https://github.com/commew/timelogger-web/pull/35

以下の記事によると 200 行以内の PR がレビュアーの負担も大きく不具合も見つけやすいそうです。

https://smallbusinessprogramming.com/optimal-pull-request-size/

1 つの目安として参考にすると良いでしょう。

### Git のコミットルールについて

`.gitconfig` に以下の設定をお願いします。

```
[user]
  name = GitHubのユーザー名
  email = GitHubに登録しているメールアドレス
[core]
  autocrlf = false
```

コミットメッセージフォーマットは以下の形を推奨します。

```
1行目： # + [GitHubのissueNUmber] 変更内容の要約（タイトル、概要）
2行目： 空行
3行目以降： 変更した理由（内容、詳細）
```

以下のような形になります。

```
#13 アイコンを簡単に利用する為に react-icons を追加

react-icons については https://react-icons.github.io/react-icons/ を参照。
```

この `#13` の部分が重要でこうしておくと以下のようにコミットのリンクから対象の issue にリンクさせる事が可能です。

![2023-03-22 18 12 26](https://user-images.githubusercontent.com/11032365/226855375-c80d85b2-79bc-4515-baef-deac6cc8da0b.png)

ちなみに必須なのは 1 行目だけ、1 行だけで簡潔に分かるのがベストだしそうすべきだが、詳細説明が必要な場合は 3 行目以降に詳細なメッセージを書きます。

## 2. PR（Draft Pull Request）の作成を行う

出来るだけレビュー時の手戻りを少なくする為、早めに PR を作成する事を推奨します。

通常はソースコードに変更がないとコミットが出来ないですが、以下のように空コミットを行えば変更内容がゼロでも PR を作成する事が可能です。

```
git commit --allow-empty
```

この時に作成する PR は [Draft Pull Request](https://github.blog/jp/2019-02-19-introducing-draft-pull-requests/) とします。

この形であれば間違ってマージされる事はないですし、まだ作業途中である事が明らかに分かるからです。

PR を作成すると（正確にはコミットを GitHub 上にプッシュすると）Vercel への Preview 環境へデプロイが行われます。

Preview 環境の URL は以下から確認出来ます。

正確にはコミット毎に Preview 環境の URL が生成されるのですが、以下の箇所から確認出来る URL は対象ブランチの最新コミットを参照するので、レビューや検証時には下記から確認出来る URL を利用する事を推奨します。

![DraftPullRequest1](https://user-images.githubusercontent.com/11032365/226935374-58157b71-12d6-4cf4-b0b0-f01a4e7f789d.png)

例えば [この PR](https://github.com/commew/timelogger-web/pull/38) だと Preview 環境の URL は https://timelogger-web-git-feature-issue11add-docs-commew.vercel.app になります。

https://console.cloud.google.com/apis/credentials?project=timelogger-api の認証情報から「timmew（開発環境用）」の承認済みのリダイレクト URI を編集します。

これを行わないと Preview 環境の URL から Google アカウントによるログインが実行出来ない為です。

登録が必要なリダイレクト URI は `Preview環境のURL` + `/api/auth/callback/google` となります。

先程の例だと `https://timelogger-web-git-feature-issue11add-docs-commew.vercel.app/api/auth/callback/google` が登録するリダイレクト URI になります。

以下のように登録を行い保存を押下すると完了です。

![add_ redirect_uri](https://user-images.githubusercontent.com/11032365/226938811-efdb25f9-852b-433f-9688-8ffd4d1e1d03.png)

続いて Vercel の環境変数を編集します。

以下の URL に遷移します。

https://vercel.com/commew/timelogger-web/settings/environment-variables

編集する値は下記の通りです。（Preview 環境の値だけ編集をお願いします。）

- `NEXTAUTH_URL`
- `NEXT_PUBLIC_APP_URL`

![update_vercel_env1](https://user-images.githubusercontent.com/11032365/226942084-a7bd3030-e9c5-4110-9309-5d25c7bfc9e1.png)

この 2 つの値を Preview 環境の URL で上書きします。

![update_vercel_env2](https://user-images.githubusercontent.com/11032365/226942103-adc8917d-3e24-4c83-9c62-49da3428cf4d.png)

ただしデプロイを行わないと環境変数の変更は反映されません。

変更内容をコミットするとデプロイが行われるので変更内容をコミットしてプッシュすると良いでしょう。

ここまでの手順で Preview 環境の URL で Google ログインを行う事が可能です。

少々面倒ですが、Google ログインが利用する OpenID Connect という手法ではリダイレクト URI が登録している値と完全一致している必要がありますし、この部分に関しては仕方ないと思っています。

何か良い方法があればこのプロセスは見直す予定です。

開発の際は [ディレクトリ構成の説明](https://github.com/commew/timelogger-web/blob/main/src/README.md) に目を通して頂きたいです。

## 3. PR のレビューを依頼する

準備が出来たら Reviewers にレビューして欲しい人を追加して PR を `Ready for review` 状態にします。

その前の以下のセルフチェックをお願いします。

- PR のタイトルは分かりやすい事
- PR が大きすぎないか（大きい場合はいくつかの PR に分割する）
- PR テンプレートに従って必要な情報が記載されている事
- Storybook が追加されている事
- 必要に応じて Jest によるテストが追加されている事
- CI が通っている事

また開発メンバーの 1 人である [keitakn](https://github.com/keitakn) が書いた [GitHub のコードレビューを受ける際に気をつける事](https://zenn.dev/keitakn/articles/github-code-review-reviewee) を見て頂けると嬉しいです。

ちなみにこれはレビュアー向けの情報ですが、レビューコメントに関してはコメントと共に以下のラベルをつける事を推奨します。

### ![badge](https://img.shields.io/badge/review-must-red.svg)

このラベルが付いている場合はレビューイは必ず修正を取り込む必要があります。

ただし出来る限りこのラベルは使わない事が望ましいと考えています。

コードレビューはレビュアーの考え方を一方的に押し付ける為の「検査」ではなくレビューイと共に同じ成果物を作り上げる為の行為だと思っています。

その為、以下のように誰の目から見ても明らかに修正が必要だと思う事だけこのラベルを使う事を推奨します。

- セキュリティ上重大なリスクがある
- 実装に仕様の誤りがある

### ![badge](https://img.shields.io/badge/review-imo-orange.svg)

レビュアーから見て自分ならこうするけど、どうでしょうか？と問いかける際に利用します。

修正を行うかどうかはレビューイが判断します。

修正を取り込まない場合、取り込めない理由を返信する必要があると考えています。

### ![badge](https://img.shields.io/badge/review-nits-green.svg)

些細な指摘です。（typo など）

### ![badge](https://img.shields.io/badge/review-ask-blue.svg)

意図が分からないのでレビュアーがレビューイに質問する時に利用します。

少し前にこんな話題がありましたが、このラベルが付けられている場合は質問以上の意図はないので、意図や理由を述べずに「修正しました。」等になるコミュニケーションは避けたいと考えています。

https://twitter.com/jnchito/status/1624955218655072257?s=20

https://togetter.com/li/2078491

### ![badge](https://img.shields.io/badge/review-suggestion-blue.svg)

こちらはレビュアーからの具体的な提案です。

必ず具体的な修正内容がセットで記載されます。

場合によっては GitHub の以下の機能とセットで利用するのも良いでしょう。

https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/incorporating-feedback-in-your-pull-request

## 4. main ブランチへのマージ

PR で 1 名以上から `Approve` をもらえたら `main` ブランチへのマージをお願いします。

この時点で本番環境 https://timmew.commew.net へデプロイが実施されます。

## 5. リリースページの作成

以下の手順でリリースページを作成します。

この手順がないとロールバックを行う事が難しくなりますので必ず実施をお願いします。

以下がリリースページのサンプルです。

https://github.com/commew/timelogger-web/releases/tag/v0.0.1

本リポジトリのトップページから Releases の一覧に進みます。

![create_release1](https://user-images.githubusercontent.com/11032365/226859151-fe6fbf99-0d46-4d0d-bc4f-9147f830548c.png)

「Draft a new release」を押下します。

![create_release2](https://user-images.githubusercontent.com/11032365/226859145-1cc43422-474a-4def-a208-e7cb01575981.png)

`Choose a tag` から対象の Git タグを作成します。

Git タグは [セマンティック バージョニング](https://semver.org/lang/ja/) 形式を採用します。

パッチ、マイナー、メジャーの各バージョンアップの使い分けですが、以下のように行います。

- パッチバージョンアップ
  - エンドユーザーから見て利用方法が変わっていない場合はパッチバージョンアップを実施する
    - .e.g. ちょっとしたバグ修正
    - .e.g. ドキュメントの追加、利用者に関係がないテストコードの追加や Storybook の修正等
- マイナーバージョンアップ
  - エンドユーザーから見て新しい機能が追加されているが、後方互換性が維持されている場合はマイナーバージョンアップを実施する
    - .e.g. 新しい機能を追加した
- メジャーバージョンアップ
  - エンドユーザーから見て後方互換性がない破壊的な変更が行われた場合はメジャーバージョンアップを実施する
    - .e.g. 既存のページの URL を変更した
    - .e.g. 大幅なデザイン変更を実施した

リリースには複数の PR を含んでも問題はありませんが、ある程度機能が使えるようになったら細かい単位でのリリースを推奨しております。

![create_release3](https://user-images.githubusercontent.com/11032365/226930108-e5259dc6-1077-4582-97e0-b0561c4a0fae.png)

`Release title` を記載します。

`release/` + `v1.0.0` のような形で問題ありません。

`Generate release notes` を押下すると前回リリースとの差分を生成したりリリース内容の PR を自動的に貼り付けてくれるのでオススメです。

`Publish release` を押下すると完了です。

以上が release までの流れになります。
