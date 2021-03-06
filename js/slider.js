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
isRunning = autoPlay();
console.log('isRunning: ' + isRunning)
