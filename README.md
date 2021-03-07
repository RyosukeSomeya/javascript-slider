# infiniteSlider (無限ループスライダー)

Infinite Loop image slider sample

## Usage (使い方)

### 1.slider.jsを読み込みます。

```js
<script src="js/slider.js"></script>
```

### 2.HTMLにスライダー要素の枠を準備

ulやdivを用いてスライダーを設定する空要素を用意します。
idを必ず指定します。デフォルトでは`slider-wrap`となります。

```HTML
<ul id="slider-wrap">
</ul>
```

#### ※スライダーにページネーション(インジケーター)を使用する場合

idを`pagenation`と指定した空のulタグを用意します。

```HTML
<ul id="pagenation">
</ul>
```

### 3.JavaScriptを記述する

#### 3-1 設定用オブジェクトを用意します

infiniteSliderはインスタンス生成時に、初期化のための設定プロパティを持ったオブジェクトを引数にとります。
引数はのフォーマットは以下のとおりです。

```js
const sliderConfig = {
  sliderImages: [ // required
      { name: 'img/sample1.png', alt: 'サンプル画像1'},
      { name: 'img/sample2.png', alt: 'サンプル画像2'},
  ],
  sliderElemId: 'slider-wrap', // optional
  pagenation: true,            // optional
  swipe: true,                 // optional
  swipeArea: 'slider-body'     // optional
}
```

オブジェクトの指定内容

- sliderImages
  - 必須プロパティです。
  - 画像の情報を格納した配列を記述します。
  - 配列の要素は、nameとaltのプロパティを持つオブジェクトです。
  - nameにはパスを含む画像名、altにはalt属性に指定する文字列を指定してください。(altを使用しない場合は、空文字('')を指定)
- sliderElemId
  - 任意のプロパティです。
  - スライダーをセットする要素に指定するidを任意のものにする場合に使用します。CSSのように"#"はつけません。(例: 'my-slider')
  - デフォルトの場合は記述しないでください。
  - デフォルトの場合は'slider-wrap'がスライダーを設定する要素のidとなります。
- pagenation
  - 任意のプロパティです。
  - ページネーションを使用するか指定します。
  - booleanで指定してください。
  - ページネーションを使用する場合は「※スライダーにページネーション(インジケーター)を使用する場合」を参照
- swipe
  - スワイプ操作を受け付けるか指定します。
  - booleanで指定してください。
- swipeArea
  - 'swipe'を使用する場合、スワイプを検知するエリアをidで指定できます。
  - 指定しない場合は、デフォルトで'slider-wrap'となります。


#### 3-2 スライダーインスタンスを生成し実行する

実装例は、**index.html**を参照してください。

```js
const imagesList = [
    { name: './img/sample1.png', alt: 'サンプル画像1'}
    { name: './img/sample2.png', alt: 'サンプル画像2'},
    { name: './img/sample3.png', alt: 'サンプル画像3'},
    { name: './img/sample4.png', alt: 'サンプル画像4'},
    { name: './img/sample5.png', alt: 'サンプル画像5'},
    { name: './img/sample6.png', alt: 'サンプル画像6'},
]

const sliderConfig = {
    sliderImages: imagesList,       // require
    pagenation: true, 　　　　　　　　 // optional
}
const slider = new infiniteSlider(sliderConfig);

// 実行可能な機能
// 自動再生(タイマー実行)
slider.autoPlay(3000); // スライドの間隔はミリ秒で指定

// 一時停止/解除(トグル式)
slider.pause(); // 内部的にはタイマーは動作継続

// 停止
slider.stop(); // タイマーを停止

// 都度実行
slider.next(); // スライダーを左送り
slider.prev(); // スライダーを右送り
```
