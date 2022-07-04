---
title: "ポートフォリオサイトをリニューアルしました"
date: "2022/6/13"
thumbnail: "https://res.cloudinary.com/djprqtbkw/image/upload/v1655135665/blog/top.png"
introduction: "ポートフォリオサイトをリニューアルしました"
tags: ["Release Note"]
---

# はじめに
ポートフォリオサイト（本サイト）をリニューアルしたので紹介したいと思います！

# 今回使用した技術スタック

- フロントエンド: `Next.js/TypeScript`
  - Next.js/TypeScriptに挑戦しました。CSSフレームワークはTailwind CSSを使いました。
  - 
- バックエンド: `言語とかフレームワークは特になし`
  - BlogはMarkdownファイルを読み込んでいます。
  - 画像の配信はCloudinaryから実施しています。
- ホスティング: `Vercel`
  - 特にCDを用意しなくても、GithubにPushするだけでホスティングできるのは便利
  - もともとNetlifyで試験的にデプロイしていましたが、Vercelのほうが早いという記事を何個か読んだのでVercelに切り替えました

# 特徴

## デザイン

- サイト、及びロゴは<a href="https://twitter.com/ayano58764615">@ayano58764615</a>さんにデザインしていただきました。ロゴは桜文鳥がモチーフになっています。かわいい印象の強い桜文鳥をかっこよく転換していただきました。

<img src="../../../images/buntyo.png" />
<h5 style="text-align:center;">ロゴ↑</h5>
<img src="https://res.cloudinary.com/djprqtbkw/image/upload/v1648052600/thumbnail_ixgc70.png" />
<h5 style="text-align:center;">トップページ↑</h5>

## ブログの記事管理

- ブログの記事はマークダウンで管理しています。DB やバックエンドのロジックを用意しなくていいので色々楽をできます。
- コードのシンタックスハイライトは Prism.js で実施しました。が、好みの見栄えにするためにほとんどのハイライトは上書きしてます。

```go
type Person struct {
    Name string `json:"name"`
}

func (p *Person) sayName() string {
  return p.Name
}

```

<img src="https://res.cloudinary.com/djprqtbkw/image/upload/v1648052599/markdown_hcvtvj.png" />
 <h5 style="text-align:center;">マークダウンファイルで執筆中↑</h5>

## Zennから記事をインポートできるようにした
- [Zennが提供してくれているRSSフィードフィード](https://zenn.dev/zenn/articles/zenn-feed-rss)を使って[自分がZennに書いた記事](https://zenn.dev/ryota_o)をインポートできるようにしました。Zennに投稿されている記事は<span style="background-color:#027d9c;display:inline-block;padding:2px 6px;border-radius:5px;">#Zenn</span>が自動でつきます。
。

# 今後の予定

- とにかく記事数を増やしたいです。
- 潰せるだけ CSS のブレを修正したいです。
  - 機能デザイン両面ともより良いものにしていきたいと思います。
- 現在個人開発中のものや、その他開発中のものも準備が出来しだい掲載したいです。
- Google Analytics を入れたいです。

最後までお読み頂きありがとうございました！これからよろしくお願いします。

