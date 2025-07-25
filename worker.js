let timerId = null;
let timeLeft = 0;

self.onmessage = function(e) {
    const { command, value } = e.data;

    if (command === 'start') {
        timeLeft = value;
        if (timerId) clearInterval(timerId);
        timerId = setInterval(() => {
            timeLeft--;
            self.postMessage({ type: 'tick', timeLeft });
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerId = null;
                self.postMessage({ type: 'end' });
            }
        }, 1000);
    } else if (command === 'stop') {
        clearInterval(timerId);
        timerId = null;
    } else if (command === 'reset') {
        clearInterval(timerId);
        timerId = null;
        timeLeft = value;
        self.postMessage({ type: 'tick', timeLeft });
    }
};