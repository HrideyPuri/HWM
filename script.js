const currentTime = new Date();
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();

const classSchedule = [
    { time: { hour: 17, minute: 32 }, videoId: 'video', captureId: 'capture-btn', joinId: 'join-btn' },
    { time: { hour: 9, minute: 0 }, videoId: null, captureId: null, joinId: null },
    { time: { hour: 10, minute: 0 }, videoId: null, captureId: null, joinId: null },
    { time: { hour: 11, minute: 0 }, videoId: null, captureId: null, joinId: null },
];

const video = document.getElementById('video');
const joinButton = document.getElementById('join-btn');
const captureButton = document.getElementById('capture-btn');

// Start video stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing webcam: " + err);
    });

const currentClass = classSchedule.find(classInfo => {
    const startTime = new Date();
    startTime.setHours(classInfo.time.hour, classInfo.time.minute);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    return currentTime >= startTime && currentTime < endTime;
});

if (currentClass && currentClass.videoId) {
    captureButton.addEventListener('click', async () => {
        const detected = await recognizeFace();

        if (detected) {
            joinButton.disabled = false; // Enable the join button if face is recognized
            joinButton.classList.remove('disabled'); // Remove disabled styling
            alert("Face recognized! You can now join the meeting.");
        } else {
            alert("Face not recognized! Please try again.");
        }
    });
} else {
    captureButton.disabled = true; // Disable the capture button for non-current meetings
}

async function recognizeFace() {
    return new Promise(resolve => {
        setTimeout(() => {
            const success = Math.random() > 0.5; // Simulate recognition success or failure
            resolve(success);
        }, 1000);
    });
}