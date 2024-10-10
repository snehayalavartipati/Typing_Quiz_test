// script.js
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const textToType = document.getElementById('text-to-type');
    const userInput = document.getElementById('user-input');
    const startBtn = document.getElementById('start-btn');
    const submitBtn = document.getElementById('submit-btn'); // New Submit Button
    const timeLeftElem = document.getElementById('time-left');
    const wpmElem = document.getElementById('wpm');
    
    let timer;
    let timeLeft = 30;
    let startTime;
    
    startBtn.addEventListener('click', () => {
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
        startBtn.disabled = true;
        submitBtn.disabled = false; // Enable Submit button when timer starts
        timeLeft = 30;
        timeLeftElem.textContent = timeLeft;
        wpmElem.textContent = '0';
        startTime = new Date();
        
        timer = setInterval(() => {
            timeLeft--;
            timeLeftElem.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                userInput.disabled = true;
                startBtn.disabled = false;
                submitBtn.disabled = true; // Disable Submit button when time is up
                calculateWPM();
            }
        }, 1000);
    });
    
    submitBtn.addEventListener('click', () => {
        if (!userInput.disabled) {
            calculateWPM();
            userInput.disabled = true;
            startBtn.disabled = false;
            submitBtn.disabled = true; // Disable Submit button after submission
        }
    });
    
    function calculateWPM() {
        const endTime = new Date();
        const timeDiff = (endTime - startTime) / 60000; // Time difference in minutes
        const words = userInput.value.trim().split(/\s+/).length;
        const wpm = Math.round(words / timeDiff);
        wpmElem.textContent = wpm;
    }
    function compareText() {
        const userText = userInput.value.trim();
        const userWords = userText.split(/\s+/);
        const correctWords = textToType.split(/\s+/);

        let resultHtml = '';
        
        for (let i = 0; i < correctWords.length; i++) {
            if (userWords[i] === correctWords[i]) {
                resultHtml += `<span class="correct">${correctWords[i]}</span> `;
            } else {
                resultHtml += `<span class="incorrect">${correctWords[i]}</span> `;
            }
        }
        
        comparisonResult.innerHTML = resultHtml;
    }
});

