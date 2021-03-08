/**
 * @file 無限ループスライダークラス
 * @author Ryosuke Someya <ryosuke.someya.0618@gmail.com>
 * @version 1.0.0
 */
class infiniteSlider {
  constructor(sliderConfig) {
    // スライダー初期化処理
    const sliderImages = sliderConfig.sliderImages;
    const sliderElemId = sliderConfig.sliderElemId || 'slider-wrap';
    this.slideWidth    = sliderConfig.slideWidth || '100%';
    let pagenationInit = false;
    let swipeInit      = false;
    let swipeAreaId    = null;

    if (sliderConfig.pagenation) {
      pagenationInit = true;
    }
    if (sliderConfig.swipe) {
      swipeInit = true;
      swipeAreaId = sliderConfig.swipeAreaId || 'slider-wrap';
    }

    // スライダー構成要素の初期化
    this.sliderWrapElem = document.getElementById(sliderElemId);
    this.sliderItems = [];

    // スライダー用のli要素を生成
    sliderImages.forEach((image, index) => {
      const elem = `<li class="slider-item" data-index="${index}"><img src="${image.name}" alt="${image.alt}"></li>`;
      this.sliderItems.push(elem);
    });
    this.sliderItemsLength = this.sliderItems.length;

    // 初期値としてsliderに挿入されるli要素グループ
    const forwardItems = this.sliderItems.slice(-1);  // ループ用に前後に要素を追加
    const insertSliderItems = [
      ...forwardItems,
      ...this.sliderItems,
    ];

    // DOMへセット
    insertSliderItems.forEach(insertSliderItem => {
      this.sliderWrapElem.insertAdjacentHTML('beforeend', insertSliderItem);
    })

    document.querySelector('.slider-item').style.marginLeft = `-${this.slideWidth}`; // 表示画像位置調整
    pagenationInit ? this._initPagenation(this.sliderItems) : '';       // ページネーション設定
    swipeInit ? this._initSwipe(swipeAreaId) : '';                      // スワイプ設定
  }

  next() { // 左送り
    const slideWidth = this.slideWidth;
    console.log(slideWidth)
    const currentSliderElems = document.querySelectorAll('.slider-item'); // 現在のスライダー内のli要素を全取得
    currentSliderElems[1].style.marginLeft = `-${this.slideWidth}`; // スライド実行

    if (this.pagenation) {
      const currentDisplayElemIndex = Number(currentSliderElems[2].getAttribute('data-index')); // スライド後表示されるの画像のindex
      this._changePagenation(currentDisplayElemIndex, this.sliderItemsLength);                  // ページネーション実行
    }

    // 最後尾の要素のindexを取得
    let lastElemIndex = Number(currentSliderElems[currentSliderElems.length-1].getAttribute('data-index'));
    lastElemIndex === this.sliderItemsLength - 1 ? lastElemIndex = -1: lastElemIndex;         // スライダーの最後要素のindexであれば、先頭要素のindexをセット
    this.sliderWrapElem.insertAdjacentHTML('beforeend', this.sliderItems[lastElemIndex + 1]); // 最後尾に次の要素追加
    currentSliderElems[0].remove(); // 先頭の要素を削除
  }

  prev() { // 右送り
    const currentSliderElems = document.querySelectorAll('.slider-item'); // 現在のスライダー内のli要素を全取得
    let firstElemIndex = Number(currentSliderElems[0].getAttribute('data-index'));    // 先頭の要素のindexを取得

    firstElemIndex === 0 ? firstElemIndex = this.sliderItemsLength : firstElemIndex; // スライダーの先頭要素のindexが0であれば、最後の要素のindexをセット
    this.sliderWrapElem.insertAdjacentHTML('afterbegin', this.sliderItems[firstElemIndex - 1]); // 先頭に次の要素追加

    const newSliderElems = document.querySelectorAll('.slider-item'); // 最新の先頭の要素を取得
    newSliderElems[0].style.marginLeft = `-${this.slideWidth}`; // スライド実行
    newSliderElems[1].style.marginLeft = "";

    if (this.pagenation) {
      const currentDisplayElemIndex = Number(currentSliderElems[1].getAttribute('data-index')); // スライド後表示されるの画像のindex取得
      this._changePagenation(currentDisplayElemIndex, this.sliderItemsLength, "prev"); // ページネーション実行
    }
  }

  autoPlay(timer) { // 自動再生
    this.isAutoplay = true;
    this.sliderId = setInterval(() => {
      if (this.isAutoplay) {
        this.next();
      } else {
        console.log('停止中: ' + this.isAutoplay);
      }
    }, timer);
    // チェック用
    // console.log('auto started sliderId: ' + this.sliderId);
    // console.log('isAutoplay: ' + this.isAutoplay);
  }

  pause() { // 自動再生停止
    if (this.isAutoplay) {
      this.isAutoplay = false;
    } else {
      this.isAutoplay = true;
    }
  }

  restart() { // 自動再生再開
    this.isAutoplay = true;
  }

  stop() { // 自動再生停止
    clearInterval(this.sliderId)
  }

  _initPagenation(sliderItems) {
    const pagenationWrap = document.getElementById('pagenation'); // ページネーション対象要素取得
    if (pagenationWrap) {
      sliderItems.forEach(() => pagenationWrap.insertAdjacentHTML('beforeend', '<li class="pagenation-item"></li>'))
    } else {
      console.error('idを"pagenation"と設定した、空のul要素が必要です。');
    }
    this._changePagenation(0, sliderItems.length); // ページネーション初期化
    this.pagenation = true; // ページネーション実行フラグ初期化
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

  _initSwipe(elem) {
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
