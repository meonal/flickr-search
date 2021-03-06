# Flickr Search

site: https://meonal.github.io/

React-Redux-Typescriptのサンプルアプリです。  
FlickrAPIを叩いて画像を検索したりします。  
APIのEndpointはAzure Funcitionsで作っています。  
cold startのため初回の検索は10秒ほどかかります。

## 使い方
- 適当な場所にclone
- src/firebase/config.ts に  
 firebase console の [ウェブアプリにFirebaseを追加] に記載されているconfigの中身をペーストして保存
- yarn install
- yarn start

## 基本構成
- react 15.6.1
- react-edux 5.0.6
- typescript 2.5.2

Create React Appでyarn install, yarn eject。typescriptを最新にアップデートした状態。

## 実装済み

### 開発環境系
- react-hot-loader
- redux-devtools
- redux-logger

hot reload & time travel debugのために導入。  
hot reloadは便利。これなくして開発するのはちょっとしんどい。  
time travelは正直あんまり使わない。  
今回のケースにおいては、後述のステートの永続化で十分だった。

### Action
- typescript-fsa
- typescript-fsa-reducer

typescriptの型を活かすために以下のモジュールを採用。  
reducerでの型推論が強力に効くため型安全かつ便利。  
デメリットとしてbindActionCreatorが使えないため（typescript力が足りないせいかも）  
containerでのマッピングが面倒。
代替策として[ActionDispatcher](https://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696)で対応。

### 非同期
- redux-thunk
- typescript-fsa-redux-thunk

複雑なことをやっていないためasync/awaitで対応。  
race conditionが発生するようなアプリではredux-saga、rxjsなどが必要になりそう。

### 永続化
- redux-persist
- redux-persist-crosstag

localstorageにstateを保存して復元・同期。  
なので、同期に関してははデバイス間ではなくブラウザのタブ間。  
デバッグ時に再現手順を実行しなくてよいため思いの外役にたった。  
firebaseでの永続化・リアルタイム同期を実装した現在は未使用。

### 認証
- firebase
- firebaseui

Firebase Authenticationを使用。  
主要なOAuthプロバイダ（Google, Twitter, GitHub）でのOAuth認証、  
メール＆パスワードもしくはSMSでのアカウント作成＆認証が簡単に実装できた。  
前者（OAuth関連）だけなら自分で実装した場合と比較して少し手間が省ける程度だが  
後者のメール＆パスワード認証は、最初から必要な機能（確認メール送信、パスワード・メールアドレス変更など）が用意されている、  
SMS認証はそもそも自分で用意するのが無理なので利用価値は高い。  
fireabae consoleからパスワードのハッシュ化パラメータがエクスポート可能なので他への移行は可能（試してない）  
カスタムOAuthプロバイダとしてLINEなどを追加するやり方も公式ブログで紹介あり。（試してない）

firabaseuiを使うと専用UIを実装しなくていいため更に楽。  

### 永続化＆リアルタイム同期
- firebase

Firebase Realtime Databaseを使用。  
非常に簡単に永続化、リアルタイムでのデバイス間同期ができた。  
まだ簡単な使い方（ユーザーの設定とFavの同期）にしか使ってないため、特に書くことがない。  
fireabae consoleからデータのエクスポートが可能なので他のドキュメントDBへの移行は可能。（試してない）  
パフォーマンス観点では、N:NのデータではRDBMSのようなリンクテーブルではなく非正規化がいいらしい（試してない）  

### CSS
- babel-plugin-react-css-modules

一番ラクそう＆簡単に他に移行できそうなCSS Modulesを採用。  
コンポーネントごとにcssファイルを作成、名前の衝突を気にせず適当にやれるのはすごい楽。  
モジュールに関しては、同一作者製でreact component版とbabel plugin版がある。  
比較としては、
- 後者のほうが新しく性能がよい
- ただし、typescriptでbabel pluginを使うには一工夫が必要

であるが、[詳細な導入方法の解説](https://qiita.com/ovrmrw/items/d3d7ff119778f82c9672)があったため後者を採用した。


### 見た目系
- react-bootstrap

### ルーティング
- react-router
- react-router-redux

いわゆるV4系を採用。
react-router-reduxの対応があまり追いついていないらしく  
time travelできないが特に困ってないので公式であるこれを採用。  
connected-react-router（☆300程度）がV4系に完全対応できてるらしい。

## TODO
- jest, enzymeでテストを書く
- redux-saga, rxjsを試す
- firebaseのRealtime Databaseでデバイス間同期
