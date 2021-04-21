const selector = {
    player: document.querySelector('.player'),
    video: document.querySelector('video'),
    playBtn: document.getElementById('play-btn'),
    progressRange: document.querySelector('.progress-range'),
    progressBar: document.querySelector('.progress-bar'),
    timeElapsed: document.querySelector('.time-elapsed'),
    timeDuration: document.querySelector('.time-duration'),
    playbackSpeed: document.querySelector('.playback-speed'),
    fullscreenEl: document.querySelector('.fullscreen'),
    volumeIcon: document.getElementById('volume-icon'),
    volumeRange: document.querySelector('.volume-range'),
    volumeBar: document.querySelector('.volume-bar')
}

const {player, video, playBtn, progressRange, progressBar, timeElapsed, timeDuration, playbackSpeed, fullscreenEl, volumeIcon, volumeBar, volumeRange} = selector

function togglePlay() {
    if (!video.paused) {
        video.pause()
        playBtn.classList.replace('fa-pause', 'fa-play')
        playBtn.setAttribute('title', 'Play')
    } else {
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause')
        playBtn.setAttribute('title', 'Pause')
    }
}

function updateProgressBar() {
    const newWidth = video.currentTime / video.duration * 100
    progressBar.style.width = `${newWidth}%`
    timeElapsed.textContent = displayTime(video.currentTime)
    timeDuration.textContent = displayTime(video.duration)
}

function setProgressBar(e) {
    const newTime = e.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration
}

function displayTime(time) {
    const minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${seconds}`
}

function rateHandler() {
    video.playbackRate = playbackSpeed.value
}

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

let fullscreen = false

function toggleScreen() {
    !fullscreen ? openFullscreen(player) : closeFullscreen()
    fullscreen = !fullscreen
}

let lastVolume = 1

function volumeHandler(e) {
    let volume = e.offsetX / volumeRange.offsetWidth
    volumeIcon.className = ''
    if (volume > 0.9) {
        volume = 1
    }
    if (volume < 0.1) {
        volume = 0
    }

    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume

    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up')
    }
    if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down')
    }
    if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }
    lastVolume = volume
}

function toggleMute() {
    volumeIcon.className = ''
    if (video.volume) {
        video.volume = 0
        volumeIcon.classList.add('fas', 'fa-volume-mute')
        volumeIcon.setAttribute('title', 'Unmute')
    } else {
        video.volume = lastVolume
        volumeIcon.classList.add('fas', 'fa-volume-up')
        volumeIcon.setAttribute('title', 'Mute')
    }
}

playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgressBar)
video.addEventListener('canplay', updateProgressBar)
video.addEventListener('ended', togglePlay)
progressRange.addEventListener('click', setProgressBar)
volumeRange.addEventListener('click', volumeHandler)
playbackSpeed.addEventListener('click', rateHandler)
fullscreenEl.addEventListener('click', toggleScreen)
volumeIcon.addEventListener('click', toggleMute)
