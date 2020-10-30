let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const timerEnd = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll('[data-time]');



function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    displayEndTime(then)


    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // stop timer when time left is < 0;
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)

}


function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    document.title = `Time Left : ${display}`;
    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
    const endTime = new Date(timeStamp);
    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();
    const display = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    timerEnd.textContent = `Come Back at ${display}`;
}

function submitMintues(e) {
    e.preventDefault();
    const mins = parseInt(this.minutes.value);
    if (isNaN(mins)) {
        this.reset();
        return;
    }
    timer(mins * 60);
    this.reset();
}

buttons.forEach(button => button.addEventListener('click', () => timer(button.dataset.time)));

document.customForm.addEventListener('submit', submitMintues);