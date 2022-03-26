class Timer {
    constructor(timeZone) {
        this.timeZone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.timer = timeZone;
    }

    getTime() {
        this.updateTimer();
        if (this.timer) {
            let hours = this.timer.getHours();
            let minutes = this.timer.getMinutes();

            if(hours < 10) {
                hours = '0' + hours;
            }

            if(minutes < 10) {
                minutes = '0' + minutes;
            }

            return [hours, minutes];
        }

        return null;
    }

    getDate() {
        this.updateTimer();
        if (this.timer) {
            return this.timer.getDate() + "" + this._getMonthName(this.timer.getMonth());
        }

        return null;
    }

    getTimezone(){
        return this.timeZone.split('/')[1].replace('_', ' ');
    }

    updateTimer() {
        this.timer = this._convertTimeZone(new Date(Date.now()), this.timeZone);
    }

    dispose() {
        this.timer = null;
    }

    _getMonthName(dayNumber) {
        switch (dayNumber) {
            case 0:
                return 'January';
            case 1:
                return 'February';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
        }
    }

    _convertTimeZone(date, tzString) {
        return new Date(date.toLocaleString("en-US", {timeZone: tzString}));
    }
}