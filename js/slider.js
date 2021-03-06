let sliderId = null; // setIntervalのID
let count = 0;
let isRunning = false; // 動作中判定フラグ

function autoPlay() { // 自動再生
  sliderId = setInterval(() => {
    console.log(count)
    count++;
  }, 1000);
  // log for check
  console.log('auto started sliderId: ' + sliderId);
  console.log('isRunning: ' + isRunning);
  return true;
}

function stop() { // 停止
  clearInterval(sliderId)
  isRunning = false;
  // log for check
  console.log('stopped sliderId: ' + sliderId);
  console.log('isRunning: ' + isRunning);
  return false;
}

function restart() { // 自動再生再開
  if(!isRunning) {
    isRunning　= autoPlay();
    // log for check
    console.log('restarted sliderId: ' + sliderId);
    console.log('isRunning: ' + isRunning);
  }
}



const stopBtn = document.getElementById('stop-btn');
stopBtn.addEventListener('click', ()=> {
    isRunning = stop();
});

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', ()=> {
    isRunning = autoPlay();
    console.log('isRunning: ' + isRunning);
});

// 初期実行
// isRunning = autoPlay();
// console.log('isRunning: ' + isRunning);

// ======================================================================
// ココから
// ======================================================================

class Slider {
  constructor(imagesList, pagenation = true, swipe = true) {
    // スライダー初期化処理
    // スライダーの枠の要素
    this.sliderWrapElem = document.getElementById('slider-wrap');
    // スライダーに挿入する要素を格納する
    this.sliderItems = [];
    // スライダー用のli要素を生成
    imagesList.forEach((image, index) => {
      const elem = `<li class="slider-item"><img src="img/${image.name}" alt="${image.alt}" data-index="${index}"></li>`;
      this.sliderItems.push(elem);
      this.sliderItemsLength = this.sliderItems.length;
    });
    // ループ用に前後に要素を追加
    const forwardItems = this.sliderItems.slice(-2);
    const backwardItems = this.sliderItems.slice(0, 2);
    // 初期値としてsliderに挿入されるli要素
    const insertSliderItems = [
      ...forwardItems,
      ...this.sliderItems,
      ...backwardItems
    ];
    // DOMへセット
    insertSliderItems.forEach(insertSliderItem => {
      this.sliderWrapElem.insertAdjacentHTML('beforeend', insertSliderItem);
    })
    // 表示画像位置調整
    this._setOffset();
    // ページネーション設定
    pagenation ? this._setPagenation(this.sliderItems) : "";
    // スワイプ設定
    // pageNation ? this._setSwipe() : "";
    // autoPlay実行時使用
    this.sliderId = null; // setIntervalのID
    this.isAutoplay = false; // autoPlay判定フラグ
    // 現在表示中の要素のindex
  }

  next() { // 左送り
    // 現在のスライダー内のli要素を全取得
    // const firstElem = document.querySelectorAll('.slider-item');
    // firstElem.style.marginLeft = "-100%"
  }

  prev() { // 右送り

  }

  autoPlay(timer) { // 自動再生
    console.log(timer)
  }

  stop() { // 自動再生停止

  }

  restart() { // 自動再生再開

  }

  _setOffset() {
    // スライダー画像全取得
    const targetElems = document.querySelectorAll('.slider-item');
    // 最初の2要素をずらしておく
    for (let i = 0; i < 2; i++) {
      targetElems[i].style.marginLeft = '-100%';
    }
  }

  _setPagenation(sliderItems) {
    // ページネーション対象要素取得
    const pagenationWrap = document.getElementById('pagenation');
    if (pagenationWrap) {
      sliderItems.forEach(() => pagenationWrap.insertAdjacentHTML('beforeend', '<li class="pagenation-item"></li>'))
    } else {
      console.error('idを"pagenation"と設定した、空のul要素が必要です。')
    }
  }
}

const imagesList = [
  { name: 'sample1.png', alt: 'サンプル画像1'},
  { name: 'sample2.png', alt: 'サンプル画像2'},
  { name: 'sample3.png', alt: 'サンプル画像3'},
]

const slider = new Slider(imagesList);

const nextBtn = document.getElementById('next-btn');
console.log(nextBtn)
nextBtn.addEventListener('click', ()=> {
    slider.next();
});
// console.log(slider);



