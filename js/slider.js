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
      const elem = `<li class="slider-item" data-index="${index}"><img src="img/${image.name}" alt="${image.alt}"></li>`;
      this.sliderItems.push(elem);
      this.sliderItemsLength = this.sliderItems.length;
    });
    // ループ用に前後に要素を追加
    const forwardItems = this.sliderItems.slice(-1);
    // 初期値としてsliderに挿入されるli要素
    const insertSliderItems = [
      ...forwardItems,
      ...this.sliderItems,
    ];
    // DOMへセット
    insertSliderItems.forEach(insertSliderItem => {
      this.sliderWrapElem.insertAdjacentHTML('beforeend', insertSliderItem);
    })
    // 表示画像位置調整
    document.querySelector('.slider-item').style.marginLeft = '-100%';
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
    const currentSliderElems = document.querySelectorAll('.slider-item');
    // 最後尾の要素を取得
    const lastElem = currentSliderElems[currentSliderElems.length-1];

    // スライド実行
    currentSliderElems[1].style.marginLeft = "-100%";

    // ページネーション実行
    // スライド後表示されるの画像のindex
    const currentDisplayElemIndex = Number(currentSliderElems[2].getAttribute('data-index'));
    this._changePagenation(currentDisplayElemIndex, this.sliderItemsLength);

    // 最後尾の要素のindexを取得
    let lastElemIndex = Number(lastElem.getAttribute('data-index'));
    // スライダー要素最後のindexであれば、0にしてループする。
    lastElemIndex === this.sliderItemsLength - 1 ? lastElemIndex = -1: lastElemIndex;
    this.sliderWrapElem.insertAdjacentHTML('beforeend', this.sliderItems[lastElemIndex + 1]); // 最後尾に次の要素追加
    // 先頭の要素を削除
    currentSliderElems[0].remove();
  }

  prev() { // 右送り

  }

  autoPlay(timer) { // 自動再生
    a(timer)
  }

  stop() { // 自動再生停止

  }

  restart() { // 自動再生再開

  }

  _setPagenation(sliderItems) {
    // ページネーション対象要素取得
    const pagenationWrap = document.getElementById('pagenation');
    if (pagenationWrap) {
      sliderItems.forEach(() => pagenationWrap.insertAdjacentHTML('beforeend', '<li class="pagenation-item"></li>'))
    } else {
      console.error('idを"pagenation"と設定した、空のul要素が必要です。')
    }
    // ページネーション初期化
    this._changePagenation(0, sliderItems.length)
  }

  _changePagenation(currentDisplayElemIndex, elementsLength, change = 'next') {
    console.log('クリック時に表示されている要素のindex: ' + currentDisplayElemIndex)
    // 全てのページネーション要素を取得
    const pagenations = document.querySelectorAll('.pagenation-item');
    if (change === 'next') {
      pagenations[currentDisplayElemIndex].classList.add('active');
      if (currentDisplayElemIndex !== 0) {
        pagenations[currentDisplayElemIndex-1].classList.remove('active');
      } else {
        pagenations[elementsLength-1].classList.remove('active');
      }
    } else {
      // pagenations[currentDisplayElemIndex].classList.remove('active');
      // if (currentDisplayElemIndex !== 0) {
      //   pagenations[currentDisplayElemIndex-1].classList.add('active');
      // } else {
      //   pagenations[elementsLength-1].classList.add('active');
      // }
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

nextBtn.addEventListener('click', ()=> {
    console.log('next')
    slider.next();
});
// console.log(slider);



