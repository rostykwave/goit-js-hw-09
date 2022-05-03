import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    start: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

///вибрана дата
let selectedTime = 0;

///об'єкт опцій для передачі в flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log('onClose: ',selectedDates[0]);
      ///додано
      selectedTime = selectedDates[0].getTime();
       const currentTime = Date.now();


      if (selectedTime < currentTime) {
        //   alert("Please choose a date in the future");
          Notify.warning('Please choose a date in the future');
          refs.start.setAttribute('disabled', true);
      } else {
          refs.start.removeAttribute('disabled');        
      }
      ////
  },
};



///Основний функціонал - виконання коду
flatpickr("#datetime-picker", options);

refs.start.addEventListener('click', onStartClick)


////Функції
function onStartClick(){
    const timerId = setInterval(setInterface, 1000);
    // refs.start.setAttribute('disabled', true);
    this.setAttribute('disabled', true);
}

////Форматування значення виводу в інтерфейс
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

////Виведення в інтерфейс
function setInterface() {

    const curentTime = Date.now();
    ////в мілісекундах
    const timeDelta = selectedTime - curentTime;

    //об'єкт з розподілом на дні, години тощо
    // const timeComponents = convertMs(timeDelta);

    //Деструктуризація об'єкту timeComponents
    const { days, hours, minutes, seconds } = convertMs(timeDelta);
    
   ////Перевірка, яка не дозволяє переходити на від'ємні значення відліку часу
    if (timeDelta >= 0) {
        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);
    }
}

///Функція для перетворення мілісекунд UNIX  в об'єкт з набором {день, година, хвилина, секунда}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}