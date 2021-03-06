/**
 * @file 無限ループスライダークラス
 * @author Ryosuke Someya <ryosuke.someya.0618@gmail.com>
 * @version 1.0.0
 */
class infiniteSlider {
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
    pagenation ? this._setPagenation(this.sliderItems) : '';
    // スワイプ設定
    swipe ? this._setSwipe('slider-body') : '';
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
    // 現在のスライダー内のli要素を全取得
    const currentSliderElems = document.querySelectorAll('.slider-item');
    // 先頭の要素を取得
    const firstElem = currentSliderElems[0];
    // 先頭の要素のindexを取得
    let firstElemIndex = Number(firstElem.getAttribute('data-index'));
    // console.log(firstElemIndex)
    // スライダー要素先頭のindexが0であれば、要素最後のindexにしてループする。
    firstElemIndex === 0 ? firstElemIndex = this.sliderItemsLength : firstElemIndex;
    this.sliderWrapElem.insertAdjacentHTML('afterbegin', this.sliderItems[firstElemIndex - 1]); // 先頭に次の要素追加
    // 最新の戦闘要素を取得
    const newSliderElems = document.querySelectorAll('.slider-item');
    // スライド実行
    newSliderElems[0].style.marginLeft = "-100%";
    newSliderElems[1].style.marginLeft = "";

    // ページネーション実行
    // スライド後表示されるの画像のindex
    const currentDisplayElemIndex = Number(currentSliderElems[1].getAttribute('data-index'));
    this._changePagenation(currentDisplayElemIndex, this.sliderItemsLength, "prev");
  }

  autoPlay(timer) { // 自動再生
    this.sliderId = setInterval(() => {
      console.log(this.isAutoplay)
      if (this.isAutoplay) {
        this.next();
      } else {
        console.log('停止中: ' + this.isAutoplay);
      }
    }, timer);
    // log for check
    this.isAutoplay = true;
    console.log('auto started sliderId: ' + this.sliderId);
    console.log('isAutoplay: ' + this.isAutoplay);
  }

  pause() { // 自動再生停止
    this.isAutoplay = false;
  }

  restart() { // 自動再生再開
    this.isAutoplay = true;
  }

  stop() { // 自動再生停止
    clearInterval(this.sliderId)
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
      console.log(currentDisplayElemIndex)
      pagenations[currentDisplayElemIndex].classList.remove('active');
      if (currentDisplayElemIndex !== 0) {
        pagenations[currentDisplayElemIndex-1].classList.add('active');
      } else {
        pagenations[elementsLength-1].classList.add('active');
      }
    }
  }

  _setSwipe(elem) {
    let t = document.getElementById(elem);
    let startX;
    let startY;
    let moveX;
    let moveY;
    let dist = 30;

    t.addEventListener('touchstart', e => {
      e.preventDefault();
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
    });

    t.addEventListener('touchmove', e => {
      e.preventDefault();
      moveX = e.changedTouches[0].pageX;
      moveY = e.changedTouches[0].pageY;
    });


    t.addEventListener('touchend', e => {
      if (startX > moveX && startX > moveX + dist) {
        this.next();
      } else if (startX < moveX && startX + dist < moveX) {
        this.prev();
      }
    });
  }
}

const imagesList = [
  { name: 'sample1.png', alt: 'サンプル画像1'},
  { name: 'sample2.png', alt: 'サンプル画像2'},
  { name: 'sample3.png', alt: 'サンプル画像3'},
  { name: 'sample4.png', alt: 'サンプル画像4'},
  { name: 'sample5.png', alt: 'サンプル画像5'},
  { name: 'sample6.png', alt: 'サンプル画像6'},
]

const slider = new infiniteSlider(imagesList);
slider.autoPlay(3000);

const nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', () => {
  slider.next();
});

const prevBtn = document.getElementById('prev-btn');
prevBtn.addEventListener('click', () => {
  slider.prev();
});

const stopBtn = document.getElementById('stop-btn');
stopBtn.addEventListener('click', () => {
    slider.stop();
});

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
    slider.autoPlay(3000);
});

const pauseArea = document.getElementById('slider-body');
pauseArea.addEventListener('mouseover', () => {
  slider.pause();
})
pauseArea.addEventListener('mouseout', () => {
  slider.restart();
})



