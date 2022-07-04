---
title: "【随時更新】Goのベストプラクティスについて"
date: "2022/6/14"
tags: ["Golang"]
introduction: "Goのベストプラクティスや命名規則をまとめておきます"
draft: false
thumbnail: "https://res.cloudinary.com/djprqtbkw/image/upload/v1650167126/blog/Go-Logo_LightBlue_skbgdl.jpg"
---

# はじめに
Goのベストプラクティスや命名規則をまとめておきます。

# 命名規則
Goにおける良い命名とは、
- 一貫性（ = 推測しやすい）
- 短い（ = タイピングしやすい）
- 正確（ = わかりやすい）
 
## ディレクトリ名
- なるべく1単語にする
- どうしようもない時はケバブケース(/xxx-xxxxx)
## ファイル名
- スネークケースにする
 
## MixedCaps
- Goでは変数名や関数名で単語を連結するときはアンダースコアではなくキャメルケースを使う

## パッケージ名
- パッケージがインポートされたときのアクセサの名前となる
- 簡潔に、簡明で、内容を喚起しやすいものにする
- 小文字で1単語で命名する。アンダースコアやキャメルにする必要はない
   - 例外としては `_test` suffix
- すべてのソースコードを通じてユニークである必要はない
  - もしパッケージ名の衝突が起きる場合、 エイリアスをつければOK
```go
import (
    tauth "hoge/fuga/twitter/auth"
    fauth "hoge/fuga/facebook/auth"
)
```
- パッケージのコードの中で使う関数名などは、パッケージ名を考慮して名付ける
  - `パッケージ名 + 関数名`で1セット関数名でパッケージ名を繰り返さない
  - 例えば、bufioパッケージの`Reader`という型は`bufio.Reader`で呼び出されるため、型名を`BufReader`にするべきではない
  - 呼び出す際は、`パッケージ名.関数名`で呼び出すため、型名を`Reader`としても、`bufio.Reader`と`io.Reader`などは衝突しない
- utilityパッケージにしない
  - base、util、common、lib、misc とか

## インターフェイス名
- 基本的には`method名 + er`
```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```
- 英語としておかしくても気にしなくていい

```go
type Execer interface {
    Exec(query string, args []Value) (Result, error)
}
```
- 英語的な語順を使って良い感じにすることもある

```go
type ByteReader interface {
    ReadByte() (c byte, err error)
}
```
- インターフェイスが複数のメソッドを持つ時は、インターフェイスの目的をうまく表す命名をする
  - 例: net.Conn, http.ResponseWriter, io.ReadWrite


## GetterとSetter
- Go自体はGetterとSetterを自動ではサポートしていないが、自前でGetterとSetterを作ることに関しては問題ない
- Getter名に`Get`はつけない。例えば、`owner`というunexportedなfieldがあったとして、そのGetterは`Owener()`となる
- Setter名には`Set`をつける。例えば、`owner`というunexportedなfieldがあったとして、そのSetterは`SetOwener()`となる
```go
owner := obj.Owner()
if owner != user {
    obj.SetOwner(user)
}
```

## 関数名
- 短く書く。長くなるくらいならコメントアウトで説明を書いたほうがいい

## 引数名
- 型名が説明的である場合は、引数名は簡潔に
```go
func AfterFunc(d Duration, f func()) *Timer

func Escape(w io.Writer, s []byte)
```
- 型名が曖昧な場合は引数名を説明的に
```go
func Unix(sec int64) Time

func HasPrefix(prefix []byte) bool
```

## 戻り値名
- 名前付き戻り値
  - 説明のためにのみ使われるべき

## 変数名・レシーバ名
- 英語1文字か2文字でなるべく短く命名
    - 型が`Client` であれば`c`、`cl`等
- レシーバ名は仲間のmethods間では統一する
- また、修飾語を利用しない
  - `httpClient`と`DBCreator` は両方とも`c`
- 命名は基本的にキャメルケースだが、元々略語として浸透している単語は一貫した大文字と小文字を使用
```go
ACL,API,ASCII,CPU,CSS,DNS,EOF,GUID,HTML,HTTP,
HTTPS,ID,IP,JSON,LHS、QPS、RAM、RHS、RPC、SLA、
SMTP、SQL、SSH、TCP、TLS、TTL,UDP,UI,UID,UUID,
URI,URL,UTF8,VM,XML,XMPP,XSRF,XSS
```
  
- 変数名は宣言から離れた場所で使用される名前ほど、より説明的な名前にする必要がある


## エラーの名前
- 型名
  - `〇〇Error`
- 変数名
  - 基本的には`err`
  - exportする時とかは`Err〇〇`にする（Err prefixをつける）

## map などの存在チェック
以下のように特定のキーが存在するかどうかをチェックする際には ok という変数名を使うのが慣例
```go
id, ok := tweets[tweetID]
```

# 書き方など
## レシーバについて
- レシーバのタイプはレシーバに対して一貫性をもたせる
- レシーバのタイプの使い分け
  - ポインタレシーバを使うとき
    - 迷ったとき
    - レシーバを更新したいとき
    - レシーバが大きな構造体や配列のとき
      - 大きい ≒ その構造体や配列の要素をmethodに渡すとしたとき、量が多すぎると思ったら
  - 値レシーバを使うとき
    - 変異するフィールドやポインタがない場合
    - レシーバが map、func、または chan の場合
    - レシーバの型がintやstringのような単純な基本型の場合
## Slice
- 空スライスを定義するときは`:=`で定義しないほうがいい
  - `:=`を使わない場合（`var`で定義する場合)
    - 初期値は`nil`になる
  - `:=`を使う場合
    - 初期値はnon-nilでzero-length
    - ただし、[]string{} を JSON にエンコードするときとかはこっちが良い
```go
// good
var t []string

// bad
t := []string{}
```

## 引数
- 数byteの節約のためにポインタ型を渡さないこと
  - stringやinterfaceは固定バイトだから値を直接渡していい
- 大きな構造体や成長する可能性のある構造体はポインタ型を渡していい

## エラーハンドリング
- 本当の例外のときのみpanicをつかう
- エラーハンドリングを即座に行うことで、ネストを浅くする
  - ネストが浅い = 読み手が理解しやすい
```go
// Bad
if x, err := f(); err != nil {
    // error handling
    return
} else {
    // use x
}

// Good
x, err := f()
if err != nil {
    // error handling
    return
}
// use x
```

もしくはこの書き方もOK
```go
// Good
if err := f(); err != nil {
    // error handling
    return
}
```

## コードが長い時は`:=`をつかわないで型を明確にする
- 長いコードになってくると読み手にとって`:=`はどんどん辛くなる
- 型を指定することで見やすくなる
```go
func main(){
var x int = 2020
//do something
}
```
## 不要な変数やインポートは書かない
- 残しておきたいならコメントアウトしておくこと

## すぐにエラーハンドリングしてネストを浅くする
- ネストが浅い = 読み手が理解しやすい
  
## 便利なutilitiesを使って繰り返しを減らす
- Goには、特定の機能を実行するために最適化されたutilitiesがあるのでそれらを利用して繰り返しを減らす


# 参考記事
- https://talks.golang.org/2014/names.slide#9
- https://tanakakns.github.io/go/naming/
- https://zenn.dev/keitakn/articles/go-naming-rules
- https://tanakakns.github.io/go/naming/
- https://github.com/golang/go/wiki/CodeReviewComments