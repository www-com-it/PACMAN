const pacman = document.getElementById("pacman");
const vittoria = new Audio("vittoria.mp3");

const musica = new Audio("ambient.mp3");
const overlay = document.getElementById("overlay");

musica.loop = true;

overlay.addEventListener("click", () => {
    overlay.remove();
    musica.volume = 0.08;
    musica.play();
});

const video = document.getElementById("video");
video.playbackRate = 2.0;

let posX = 0;
let posY = 0;
const keysPressed = {};

document.addEventListener("keydown", (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});

const finestraVittoria = document.getElementById("vinto");

function finishGame() {
    finestraVittoria.style.display = "flex";
    vittoria.volume = 0.05;
    vittoria.loop = true;
    vittoria.play();
    musica.pause();
}

let punteggio = 0;
let giocoFinito = false;

function checkCollision() {

    if(giocoFinito) return;

    const pacRect = pacman.getBoundingClientRect();
    const oggetto = document.getElementById("oggetto");
    if (!oggetto) return;
    const objRect = oggetto.getBoundingClientRect();
    const punti = document.getElementById("punti");

    if (
        pacRect.right > objRect.left &&
        pacRect.left < objRect.right &&
        pacRect.bottom > objRect.top &&
        pacRect.top < objRect.bottom
    ) {
        disappearObject();
        punteggio += 0.5;
        punti.innerHTML = punteggio;

        if( punteggio >= 1000) {
            giocoFinito = true;
            finishGame();
        }
    } else if (
        pacRect.right < 0 ||
        pacRect.left > window.innerWidth  || 
        pacRect.bottom < 0 || 
        pacRect.top > window.innerHeight 
    ) {
        giocoFinito = true;
        alert("Non puoi uscire dallo schermo!");
        window.location.href = window.location.href;
    }
}

function disappearObject() {
    const audio = new Audio("mangiare.mp3")
    const oggetto = document.getElementById("oggetto");
    if (oggetto.classList.contains("disappear")) return;
    
    oggetto.classList.add("disappear");
    audio.volume = 0.3;
    audio.play();

    oggetto.addEventListener("transitionend", () => {
        oggetto.remove();
        createNewOggetto();
    }, { once: true });
}

function createNewOggetto() {
    const newOggetto = document.createElement("div");
    newOggetto.id = "oggetto";

    const maxLeft = window.innerWidth - 80;
    const maxTop = window.innerHeight - 80;
    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop);

    newOggetto.style.position = "absolute";
    newOggetto.style.left = randomLeft + "px";
    newOggetto.style.top = randomTop + "px";   
    newOggetto.style.height = "80px";
    newOggetto.style.width = "80px";
    newOggetto.style.backgroundImage = "url('nemico.png')";
    newOggetto.style.backgroundSize = "cover";
    newOggetto.style.backgroundPosition = "center";
    newOggetto.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    document.body.appendChild(newOggetto);
}

function movePacman() {
    if ((keysPressed["w"])) {
        posY -= 5;
    }
    if ((keysPressed["s"])) {
        posY += 5;
    }
    if ((keysPressed["a"])) {
        posX -= 5;
    }
    if ((keysPressed["d"])) {
        posX += 5;
    }

    pacman.style.transform = `translate(${posX}px, ${posY}px)`;
    checkCollision();
}

setInterval(movePacman, 10);

let timerDuration = 90; 

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    function startTimer() {
        let currentTime = timerDuration;
        const timerElement = document.getElementById("timer");
        if(timerElement) {
            timerElement.innerHTML = formatTime(currentTime);
        }
        const timerInterval = setInterval(() => {
            currentTime--;
            if(timerElement) timerElement.innerHTML = formatTime(currentTime);
            if(currentTime <= 0) {
                clearInterval(timerInterval);
                alert("Tempo scaduto, hai perso!");
                location.reload();
            }
        }, 1000);
    }
    
    let timerStarted = false;

const Up = document.getElementById("btn-up");
const Down = document.getElementById("btn-down");
const Left = document.getElementById("btn-left");
const Right = document.getElementById("btn-right");

Up.addEventListener("touchstart", () => {
    posY -= 100;
    if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }
});

Down.addEventListener("touchstart", () => {
    posY += 100;
    if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }
});

Left.addEventListener("touchstart", () => {
    posX -= 100;
    if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }
});

Right.addEventListener("touchstart", () => {
    posX += 100;
    if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }
});

function PacmanMobile() {
    pacman.style.transform = `translate(${posX}px, ${posY}px)`;
    checkCollision();
}

setInterval(PacmanMobile, 10);


function reset() {
    location.reload()
}

function facile() {
    
    musica.loop = true;
    musica.volume = 0.08;
    musica.play();

    const inizio = document.getElementById("inizio");
    inizio.style.display = "none";

    let timerDuration = 180; 

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    function startTimer() {
        let currentTime = timerDuration;
        const timerElement = document.getElementById("timer");
        if(timerElement) {
            timerElement.innerHTML = formatTime(currentTime);
        }
        const timerInterval = setInterval(() => {
            currentTime--;
            if(timerElement) timerElement.innerHTML = formatTime(currentTime);
            if(currentTime <= 0) {
                clearInterval(timerInterval);
                alert("Tempo scaduto, hai perso!");
                location.reload();
            }
        }, 1000);
    }
    
    let timerStarted = false;
    
    document.addEventListener("keydown", () => {
        if (!timerStarted) {
            timerStarted = true;
            startTimer();
        }
    });
}

function medio() {
    
    musica.loop = true;
    musica.volume = 0.08;
    musica.play();

    const inizio = document.getElementById("inizio");
    inizio.style.display = "none";

    let timerDuration = 110; 

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    function startTimer() {
        let currentTime = timerDuration;
        const timerElement = document.getElementById("timer");
        if(timerElement) {
            timerElement.innerHTML = formatTime(currentTime);
        }
        const timerInterval = setInterval(() => {
            currentTime--;
            if(timerElement) timerElement.innerHTML = formatTime(currentTime);
            if(currentTime <= 0) {
                clearInterval(timerInterval);
                alert("Tempo scaduto, hai perso!");
                location.reload();
            }
        }, 1000);
    }
    
    let timerStarted = false;
    
    document.addEventListener("keydown", () => {
        if (!timerStarted) {
            timerStarted = true;
            startTimer();
        }
    });
}

function difficile() {

    musica.loop = true;
    musica.volume = 0.08;
    musica.play();

    const inizio = document.getElementById("inizio");
    inizio.style.display = "none";

    let timerDuration = 70; 

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    function startTimer() {
        let currentTime = timerDuration;
        const timerElement = document.getElementById("timer");
        if(timerElement) {
            timerElement.innerHTML = formatTime(currentTime);
        }
        const timerInterval = setInterval(() => {
            currentTime--;
            if(timerElement) timerElement.innerHTML = formatTime(currentTime);
            if(currentTime <= 0) {
                clearInterval(timerInterval);
                alert("Tempo scaduto, hai perso!");
                location.reload();
            }
        }, 1000);
    }
    
    let timerStarted = false;
    
    document.addEventListener("keydown", () => {
        if (!timerStarted) {
            timerStarted = true;
            startTimer();
        }
    });
}

function pacmanbg() {
    pacman.style.backgroundImage = "url(pacman-vero.png)";
    facile();
}

function carmine() {
    pacman.style.backgroundImage = "url(pacman-carmine.png)";
    medio();
}

function ciccio() {
    pacman.style.backgroundImage = "url(pacman-ciccio.jpg)";
    medio();
}

function rossano() {
    pacman.style.backgroundImage = "url(pacman-rossano.png)";
    difficile();
}