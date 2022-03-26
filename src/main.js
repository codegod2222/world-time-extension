document.addEventListener('DOMContentLoaded', () => {
    localStorage = window.localStorage;

    initTimersFromLocalStorage();
    document.querySelector('.add_timer_button').addEventListener('click', buttonClickHandler);
});

// timezone: [timer, intervalID]
const activeTimers = {};

const buttonClickHandler = (e) => {
    e.target.classList.add('add_timer_button--hidden');

    TimerCreator.createNewTimer();
}

const createAndAppendNewTimer = (timeZone = 'Europe/Minsk') => {
    if(activeTimers[timeZone]) {
        alert('This timer already exist :)');
        showAddButton();
        return;
    }

    const newTimer = new Timer(timeZone);

    createAndAppendTimerBlock({
        hours: newTimer.getTime()[0],
        minutes: newTimer.getTime()[1],
        date: newTimer.getDate(),
        timezone: newTimer.getTimezone()
    });

    const intervalID = setInterval(() => findAndUpdateTimer({
        hours: newTimer.getTime()[0],
        minutes: newTimer.getTime()[1],
        date: newTimer.getDate(),
        timezone: newTimer.getTimezone()
    }), 60000);

    activeTimers[timeZone] = [newTimer, intervalID];
    writeToLocalStorage(timeZone);
}

const createAndAppendTimerBlock = ({hours = '00', minutes = '00', date = '', timezone = ''}) => {
    const newTimer = document.createElement("div");

    newTimer.className = 'timer';
    newTimer.dataset.timezone = timezone;

    newTimer.innerHTML = `
        <div class="timer__time">${hours}:${minutes}</div>
        <span class="timer_container__description">${timezone}</span>
    `;

    document.querySelector('.timers_container').appendChild(newTimer);

    showAddButton();
}

const showAddButton = () => document.querySelector('.add_timer_button').classList.remove('add_timer_button--hidden');

const findAndUpdateTimer = ({hours = '00', minutes = '00', date = '', timezone = ''}) => {
    const timers = document.getElementsByClassName('timer');

    if (timers.length > 0) {
        let resultTimer = null;

        for (const timer of timers) {
            if (timer.dataset.timezone === timezone) {
                resultTimer = timer;
                break;
            }
        }

        if (resultTimer) {
            const children = resultTimer.children;

            children[0].innerText = `${hours}:${minutes}`;
        }
    }
}