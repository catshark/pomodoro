var sessionTimer = $("#session-timer");
var breakTimer = $("#break-timer");

$(document).ready(function() {
    initApp();
});

function initApp() {
    var breakMinusBtn = document.getElementById("break-minus-button");
    var breakPlusBtn = document.getElementById("break-plus-button");
    breakTimer = document.getElementById("break-timer");

    var sessionMinusBtn = document.getElementById("session-minus-button");
    var sessionPlusBtn = document.getElementById("session-plus-button");
    sessionTimer = document.getElementById("session-timer");

    var timerBtn = document.getElementById("timer");

    breakMinusBtn.onclick = decrementBreakCounter;
    breakPlusBtn.onclick = incrementBreakCounter;

    sessionMinusBtn.onclick = decrementSessionCounter;
    sessionPlusBtn.onclick = incrementSessionCounter;

    timerBtn.onclick = initializeClock;
}

function decrementBreakCounter(event) {
    var breakTimer = $("#break-timer");
    var currentDigit = breakTimer.text();

    if (currentDigit >= 2) {
        currentDigit--;
        breakTimer.text(currentDigit);
    }
}

function incrementBreakCounter(event) {
    var breakTimer = $("#break-timer");
    var currentDigit = breakTimer.text();

    currentDigit++;
    breakTimer.text(currentDigit);
}

function decrementSessionCounter(event) {
    var timer = document.getElementById("timer");
    var sessionTimer = $("#session-timer");
    var currentDigit = sessionTimer.text();

    if (currentDigit >= 2) {
        currentDigit--;
        sessionTimer.text(currentDigit);
        timer.innerHTML = "Session<br/><br/>" + currentDigit;
    }
}

function incrementSessionCounter(event) {
    var timer = document.getElementById("timer");
    var sessionTimer = $("#session-timer");
    var currentDigit = sessionTimer.text();

    currentDigit++;
    sessionTimer.text(currentDigit);
    var newTimerVal = "Session<br/><br/>" + currentDigit;
    timer.innerHTML = newTimerVal;
}

function getTimeRemaining(milliseconds) {
    var seconds = Math.floor((milliseconds / 1000) % 60);
    var minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    return {
        'total': milliseconds,
        'minutes': minutes,
        'seconds': seconds
    };
}

function breakTime(minutes) {
    var seconds = 60;
    var mins = minutes;
    function updateClock() {
        var timer = document.getElementById("timer");
        var current_minutes = mins-1;
        seconds--;

        var newTimerVal = "Break!<br/><br/>" + ('0' + current_minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
        timer.innerHTML = newTimerVal;
        if (seconds > 0) {
            setTimeout(updateClock, 1000);
        } else if (mins > 1) {
            breakTime(mins-1);
        }
    }
    updateClock();
}

function pomodoro(minutes, callback) {
    /*var timerBtn = document.getElementById("timer");

    var sessionTime = parseInt($("#session-timer").text());
    var remainingTime = sessionTime * 60000;

    function updateClock() {
        var t = getTimeRemaining(remainingTime);
        
        var newTimerVal = "Session<br/></br>" + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2);
        timerBtn.innerHTML = newTimerVal;
        
        if (t.total <= 0) {
            clearInterval(timeinterval)
        }
    }
    
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);*/

    var seconds = 60;
    var mins = minutes;
    function updateClock() {
        var timer = document.getElementById("timer");
        var current_minutes = mins-1;
        seconds--;

        var newTimerVal = "Session<br/><br/>" + ('0' + current_minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
        timer.innerHTML = newTimerVal;
        if (seconds > 0) {
            setTimeout(updateClock, 1000);
        } else if (mins > 1) {
            pomodoro(mins-1);
        } else if (mins === 1 && seconds === 0) {
            callback($("#break-timer").text());
        }
    }
    updateClock();
}

function initializeClock(event) {
    var minutes = parseInt($("#session-timer").text());
    var seconds = 1;
    pomodoro(minutes, breakTime);
}
