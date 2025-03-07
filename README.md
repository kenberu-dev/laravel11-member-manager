## はじめに
- 本レポジトリは、PHP/Laravel学習者のケンベル(Xアカウント：@kenberu_dev)が、作成したウェブアプリケーションに関するものです。
- ご利用いただくことでのトラブルなどは一切責任を負いかねます。
![ダッシュボード画面](https://github.com/user-attachments/assets/3dd48828-4cb4-4170-8f2e-4bbe9a82b226)

## コンセプト
- 私が通っている就労移行支援施設では、面談記録をスプレッドシートで管理していました。
- スプレッドシートは、利用者ごとにシートで管理されており、複数の利用者を特定の条件でフィルタリングするなどの、柔軟な情報抽出ができない状況でした。
- そんな折、私が担当者に「何かこの施設の業務に役立つアプリケーションを開発したい」とリクエストしました。
- すると担当者から「面談記録や利用者を一元管理できるアプリケーション作ってほしい」という要望をもらい本アプリケーションの開発が始まりました。

## 企画概要
今回作成したアプリの企画概要です。
|項目|説明|
|----|----|
|プロジェクト名|MeeMane - 面談記録管理アプリ|
|目的|施設利用者の状況や面談内容などを記録することで体調管理を効率良く行えるようにする|
|目的のために作るもの|面談記録を通じて利用者の状況を把握するためのアプリケーション|
|作るものの概要|利用者との面談内容を記録|
|             |利用者ごとの面談記録一覧を表示|
|             |利用者ごとの面談記録の詳細を表示|
|             |面談記録の詳細に対してインタラクティブに議論できるチャット機能|
|作るもの利用する人|自信が所属する就労移行支援施設の従業員|
|利用する人が得られる便益|利用者の状況を一元管理することによる管理コストの削減と細やかな対応につなげることによるサービス質の向上|
|作るための体制|個人で開発|
|作成期間|約２ヶ月|

## DEMOサイトのURL
https://meemane.online/

## ログインアカウント
|項目|ユーザー|管理者|
|----|----|----|
|email|user@example.com|admin@example.com|
|pass|meemane.user|meemane.admin|

## 使用技術
- バックエンド
    - Laravel 11.21.0
    - PHP 8.2.13
- フロントエンド
    - react 18.2.0
    - inertiaJS/react 1.0.0
    - tailwindCSS 3.2.1
- データーベース
    - MariaDB 10.5.22
- インフラ
    - Apache 2.4.57
- サーバーOS
    - Rocky Linux 9.4

## 権限一覧
|権限名|説明|アクセス権限|
|----|----|----|
|一般ユーザー|各事業所に所属する一般従業員|所属事業所の利用者・面談記録の作成・閲覧・編集が可能|
|事業所管理者|各事業所に所属する管理者権限保持者|所属事業所の従業員・利用者・面談記録のCRUD操作が可能|
|全体管理者|全ての事業所の管理者権限保持者|全ての情報にアクセス可能|

## デモ動画
制作中

## こだわったポイント
- 面談記録管理機能
    - 面談記録を効率的に管理し、職員間で共有できる仕組みを実装しました。
- 利用者管理機能
    - 利用者ごとに適切なステータスを設定でき、利用者のステータスごとの分布を一覧できる仕組みを実装しました。
    - これにより、利用者の施設利用開始まで・利用中・利用後の進捗管理が容易になりました。
- ユーザー認証と役割管理機能
    - 管理者・従業員など役割に応じてアクセス権限が異なる仕組みを構築しました。
- 検索・フィルター機能
    - 面談記録や利用者情報を様々な条件で検索・フィルタリングできる機能を実装しました。

## 今後やりたいこと
- テストコードの実装
    - テストコードを実装することで品質向上を図っていきたいです。
- リファクタリング
    - コントローラーやコンポーネントの一部に共通化できそうな部分があると認識しています。
    - それらをまとめることで、コードをシンプルにしていきたいと考えています。
- メッセージ通知機能
    - 現在、CRUD処理を行ったときやメッセージを受信したときの通知機能が備わっていないです。
    - それらの通知機能を実装することで利便性の向上を図っていきたいです。
- UXとパフォーマンスの向上
    - 現在ページの遷移時の挙動が少し遅く感じるときがあります。
    - 挙動遅延の原因を特定して、パフォーマンスの向上を図っていきたいです。
    - また実装しているフィルタリング機能の利便性向上を図りたいと考えています。
    - 現状の機能では、面談記録が存在しない利用者の候補なども表示されている状態です。
    - フィルタリングの際に、これらの候補を除外した形で選択肢を提示できるようにしていきたいです。

## 機能一覧
- ログイン機能
- 面談記録CRUD機能
    - 新規登録
    - 詳細表示
        - チャット閲覧
        - メッセージ送信
    - 編集
    - 削除
- 利用者CRUD機能
    - 新規登録
    - 詳細表示
    - 編集(自身の所属する事業所のみ可能)
    - 削除(管理者権限所持者のみ操作可能)
- 従業員CRUD機能(管理者権限所持者のみ操作可能)
    - 新規登録
    - 詳細表示
    - 編集
    - 削除
- 事業所CRUD機能(最上位管理者権限所持者のみ操作可能)
    - 新規登録
    - 詳細表示
    - 編集
    - 削除

# おわりに
- 利用させていただいている就労移行支援施設の業務効率化を目的としたアプリケーションのリポジトリ公開させていただきました。
- 感想・コメントなどなればXアカウントまでご連絡くださると幸いです。