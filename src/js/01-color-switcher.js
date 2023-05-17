const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

let timerId = null;

refs.startBtn.addEventListener('click', onStartBtnChangeColor);
refs.stopBtn.addEventListener('click', onStopBtnChangeColor);

function onStartBtnChangeColor() {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);

    refs.startBtn.disabled = true;
};

function onStopBtnChangeColor() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}