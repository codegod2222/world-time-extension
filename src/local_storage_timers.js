let localStorage = null;

const TIMEZONES_KEY = 'savedTimezones';

const initTimersFromLocalStorage = () => {
    const savedTimezones = localStorage.getItem(TIMEZONES_KEY);

    if(savedTimezones) {
        JSON.parse(savedTimezones).forEach(timezone => createAndAppendNewTimer(timezone));
    }
}

const writeToLocalStorage = (timezone) => {
    const existingTimezones = localStorage.getItem(TIMEZONES_KEY);

    const timezonesArray = existingTimezones ? JSON.parse(existingTimezones) : [];

    if(timezonesArray.indexOf(timezone) === -1) {
        timezonesArray.push(timezone);
    }

    localStorage.setItem(TIMEZONES_KEY, JSON.stringify(timezonesArray));
}
