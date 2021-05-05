const timer = (timerSelector, deadLine) => {
    const addZero = number => number < 10 ? `0${number}` : number;
    const timerElement = document.querySelector(timerSelector);
    
    const remainingDate = (endDate) => {
        const total = endDate - (new Date());
        return {
            total,
            seconds: Math.floor((total / 1000) % 60),
            minutes: Math.floor((total / 1000 / 60) % 60),
            hours: Math.floor((total / 1000 / 60 / 60) % 24),
            days: Math.floor(total / 1000 / 60 / 60 / 24)
        };
    };
    const setClock = (timerNode, endDate) => {
        const changeDate = (container) => {
            const date = remainingDate(endDate);

            if (date.total > 0) {
                container.querySelector('#days').textContent = addZero(date.days);
                container.querySelector('#hours').textContent = addZero(date.hours);
                container.querySelector('#minutes').textContent = addZero(date.minutes);
                container.querySelector('#seconds').textContent = addZero(date.seconds);
            } else {
                clearInterval(timer);
            }
        };
        const timer = setInterval(changeDate, 1000, timerNode);
    };
    setClock(timerElement, deadLine);
};
export default timer;