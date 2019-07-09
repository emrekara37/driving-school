import {Map} from 'immutable';
import decode from 'jwt-decode'

export function clearToken() {
    localStorage.removeItem('id_token');
    localStorage.removeItem("courseInfo");
}

export function getToken() {
    try {
        const idToken = localStorage.getItem('id_token');
        return new Map({idToken});
    } catch (err) {
        clearToken();
        return new Map();
    }
}

export function setCalendarDate(date) {
    let arrays = date.split(",");
    let hours = arrays[1];
    let days = arrays[0];
    let splittedDay = days.split(".");
    let splittedHour = hours.split(":");
    let currentDate = new Date();
    currentDate.setFullYear(parseInt(splittedDay[2], 10),  parseInt(splittedDay[1], 10)-1, parseInt(splittedDay[0], 10))
    currentDate.setHours(parseInt(splittedHour[0], 10), parseInt(splittedHour[1], 10), parseInt(splittedHour[2], 10));
    return currentDate;
}

export function getCourseInfo() {
    try {
        return JSON.parse(localStorage.getItem('courseInfo'));
    } catch (e) {
        console.log(e);
        return null;
    }
}

export function getCourseId() {
    const token = getToken().get('idToken');
    const data = decode(token);
    return data.CourseId;
}

export function timeDifference(givenTime) {
    givenTime = new Date(givenTime);
    const milliseconds = new Date().getTime() - givenTime.getTime();
    /*
    const numberEnding = number => {
        return number > 1 ? 's' : '';
    };*/
    const number = num => (num > 9 ? '' + num : '0' + num);
    const getTime = () => {
        let temp = Math.floor(milliseconds / 1000);
        const years = Math.floor(temp / 31536000);
        if (years) {
            const month = number(givenTime.getUTCMonth() + 1);
            const day = number(givenTime.getUTCDate());
            const year = givenTime.getUTCFullYear() % 100;
            return `${day}-${month}-${year}`;
        }
        const days = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            if (days < 28) {
                return days + ' gün önce';
            } else {
                const months = [
                    'Ocak',
                    'Şbt',
                    'Mart',
                    'Nsn',
                    'Mys',
                    'Hazrn',
                    'Tem',
                    'Ağu',
                    'Eyl',
                    'Ekim',
                    'Ksm',
                    'Arlk'
                ];
                const month = months[givenTime.getUTCMonth()];
                const day = number(givenTime.getUTCDate());
                return `${day} ${month}`;
            }
        }
        const hours = Math.floor((temp %= 86400) / 3600);
        if (hours) {
            return `${hours} saat önce`;
        }
        const minutes = Math.floor((temp %= 3600) / 60);
        if (minutes) {
            return `${minutes} dakika önce`;
        }
        return 'Birkaç saniye önce';
    };
    return getTime();
}

export function stringToInt(value, defValue = 0) {
    if (!value) {
        return 0;
    } else if (!isNaN(value)) {
        return parseInt(value, 10);
    }
    return defValue;
}

export function stringToPosetiveInt(value, defValue = 0) {
    const val = stringToInt(value, defValue);
    return val > -1 ? val : defValue;
}
