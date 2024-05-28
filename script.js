function changePlayPause(change, button) {
    let toRemove = change ? "fa-pause" : "fa-play";
    let toAdd = !change ? "fa-pause" : "fa-play";
    button.children[0].classList.remove(toRemove);
    button.children[0].classList.add(toAdd);
}


function playPauseVideo(vp) {
    if (vp.paused){
        vp.play();
    }else{
        vp.pause();
    }

}

window.onload = () => {
    let videoPlayer = document.getElementById("videoPlayer")
   
    let ppButton = document.getElementById("ppButton")
    let volSlider = document.getElementById("volume")
  
   

    ppButton.addEventListener("click", event => {playPauseVideo(videoPlayer)})
    videoPlayer.addEventListener("play", () => {changePlayPause(false,ppButton)})
    videoPlayer.addEventListener("pause", () => {changePlayPause(true,ppButton)})
    volSlider.addEventListener("input", event => {videoPlayer.volume = event.target.value/100})

    playPauseVideo(vp);

   

};

function changePlayPause2(change, button) {
    let toRemove = change ? "fa-pause" : "fa-play";
    let toAdd = !change ? "fa-pause" : "fa-play";
    button.children[0].classList.remove(toRemove);
    button.children[0].classList.add(toAdd);
}

function playPauseVideo2(vp2) {
    if (vp2.paused){
        vp2.play();
    }else{
        vp2.pause();
    }

}

window.onload = () => {
    let videoPlayer2 = document.getElementById("videoPlayer2")

    let ppButton2 = document.getElementById("ppButton2")
    let volSlider2 = document.getElementById("volume2")

    ppButton2.addEventListener("click", event => {playPauseVideo(videoPlayer2)})
    videoPlayer2.addEventListener("play", () => {changePlayPause(false,ppButton2)})
    videoPlayer2.addEventListener("pause", () => {changePlayPause(true,ppButton2)})
    volSlider2.addEventListener("input", event => {videoPlayer2.volume = event.target.value/100})

    playPauseVideo2(vp2);
};




