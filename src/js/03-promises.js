import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector('.form'),
}


refs.form.addEventListener('submit', onFormSubmit);

  ////Functions

function onFormSubmit(event) {
    event.preventDefault();

    const formData = {};
    const formDataRaw = new FormData(event.currentTarget);
    ///перебір масиву формдати і додавання елементів в об'єкт
    formDataRaw.forEach((value, name) => {
        formData[name] = value;
    })
    console.log(formData);


    ///приведення інпуту до числового значення
    let delay = Number(formData.delay);
    const amount = Number(formData.amount);
    const step = Number(formData.step);


    ////Цикл
    for (let i = 1; i <= amount; i += 1) {
    ////виклик функції з промісами
        createPromise(i, delay).then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        ///збільшення затримки на крок степ після кожної ітерації і виконання функції
           delay += step;
    }
 
}


function createPromise(position, delay) {
    return new Promise((resolve, reject) => {

        const shouldResolve = Math.random() > 0.3;
        
        setTimeout(() => {
            if (shouldResolve) {
                // Fulfill
                resolve({position, delay});
            } else {
                // Reject
                reject({position, delay});
            }
        }, delay);
        
    });

}