const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

//встановлюємо змінну в загальному полі видимості, зоб можна було зупинити таймер за допомогою іншої функції
let timerId = null;



function onStartClick(){
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    refs.start.setAttribute('disabled',true);
}


function onStopClick() {
    clearInterval(timerId);
    
    refs.start.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
