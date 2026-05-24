/* ========================================= */
/* SCREEN NAVIGATION */
/* ========================================= */

const screens =
document.querySelectorAll(".screen");

const nextButtons =
document.querySelectorAll(".next-btn");

const clickSound =
document.getElementById("click-sound");

const springSound =
document.getElementById("spring-sound");

const dropSound =
document.getElementById("drop-sound");

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        playClick();

        const nextScreen =
        button.dataset.next;

        screens.forEach(screen => {

            screen.classList.remove("active");

        });

        document
        .getElementById(nextScreen)
        .classList.add("active");

    });

});

/* ========================================= */
/* SOUND */
/* ========================================= */

function playClick(){

    clickSound.currentTime = 0;

    clickSound.play();

}

function playSpring(){

    springSound.currentTime = 0;

    springSound.play();

}

function playDrop(){

    dropSound.currentTime = 0;

    dropSound.play();

}

/* ========================================= */
/* ELEMENT */
/* ========================================= */

const massaText =
document.getElementById("massa");

const gayaText =
document.getElementById("gaya");

const panjangText =
document.getElementById("panjang");

const statusText =
document.getElementById("status-text");

const spring =
document.getElementById("spring-object");

const weight =
document.getElementById("weight-object");

const stand =
document.getElementById("stand-object");

const startBtn =
document.getElementById("start-exp");

const resetBtn =
document.getElementById("reset-exp");

const restartBtn =
document.getElementById("restart-btn");

const massSelector =
document.getElementById("mass-selector");

/* ========================================= */
/* VARIABLE */
/* ========================================= */

let massa = 0;

let gaya = 0;

let pertambahan = 0;

let toolsInstalled = {

    stand: false,

    spring: false,

    weight: false

};

/* ========================================= */
/* CONSTANT */
/* ========================================= */

const gravitasi = 9.8;

const konstantaPegas = 100;

/* ========================================= */
/* DRAG TOOLBOX */
/* ========================================= */

const draggableTools =
document.querySelectorAll(".draggable-tool");

draggableTools.forEach(tool => {

    tool.addEventListener("dragstart", e => {

        e.dataTransfer.setData(
        "tool",
        tool.dataset.tool
        );

    });

});

/* ========================================= */
/* DROP ZONE */
/* ========================================= */

const dropZone =
document.getElementById("drop-zone");

dropZone.addEventListener("dragover", e => {

    e.preventDefault();

});

dropZone.addEventListener("drop", e => {

    e.preventDefault();

    const tool =
    e.dataTransfer.getData("tool");

    installTool(tool);

});

/* ========================================= */
/* INSTALL TOOL */
/* ========================================= */

function installTool(tool){

    playDrop();

    /* ========================================= */
    /* STATIF */
    /* ========================================= */

    if(tool === "stand"){

        stand.style.display = "block";

        toolsInstalled.stand = true;

        statusText.innerHTML =
        "Statif berhasil dipasang ✨";

    }

    /* ========================================= */
    /* PEGAS */
    /* ========================================= */

    if(tool === "spring"){

        if(!toolsInstalled.stand){

            alert(
            "Pasang statif terlebih dahulu!"
            );

            return;
        }

        spring.style.display = "block";

        toolsInstalled.spring = true;

        statusText.innerHTML =
        "Pegas berhasil dipasang ✨";

    }

    /* ========================================= */
    /* BEBAN */
    /* ========================================= */

    if(tool === "weight"){

        if(!toolsInstalled.spring){

            alert(
            "Pasang pegas terlebih dahulu!"
            );

            return;
        }

        weight.style.display = "block";

        toolsInstalled.weight = true;

        statusText.innerHTML =
        "Beban berhasil dipasang ✨";

    }

}

/* ========================================= */
/* DRAG OBJECT INSIDE LAB */
/* ========================================= */

makeDraggable(stand);

makeDraggable(spring);

makeDraggable(weight);

function makeDraggable(element){

    let isDragging = false;

    let offsetX, offsetY;

    element.addEventListener("mousedown", e => {

        isDragging = true;

        offsetX =
        e.clientX - element.offsetLeft;

        offsetY =
        e.clientY - element.offsetTop;

        element.style.zIndex = 999;

    });

    document.addEventListener("mousemove", e => {

        if(!isDragging) return;

        element.style.left =
        e.clientX - offsetX + "px";

        element.style.top =
        e.clientY - offsetY + "px";

        element.style.transform =
        "translateX(0)";

    });

    document.addEventListener("mouseup", () => {

        isDragging = false;

    });

}

/* ========================================= */
/* START SIMULATION */
/* ========================================= */

startBtn.addEventListener("click", () => {

    playClick();

    /* ========================================= */
    /* VALIDASI */
    /* ========================================= */

    if(!toolsInstalled.stand ||
       !toolsInstalled.spring ||
       !toolsInstalled.weight){

        alert(
        "Pasang seluruh alat terlebih dahulu!"
        );

        return;
    }

    /* ========================================= */
    /* MASSA */
    /* ========================================= */

    massa =
    parseInt(massSelector.value);

    /* ========================================= */
    /* GAYA */
    /* ========================================= */

    gaya =
    (massa / 1000) * gravitasi;

    /* ========================================= */
    /* HUKUM HOOKE */
    /* ========================================= */

    pertambahan =
    gaya / konstantaPegas;

    let panjangCM =
    (pertambahan * 100)
    .toFixed(2);

    /* ========================================= */
    /* DATA */
    /* ========================================= */

    massaText.innerHTML =
    massa + " g";

    gayaText.innerHTML =
    gaya.toFixed(2) + " N";

    panjangText.innerHTML =
    panjangCM + " cm";

    /* ========================================= */
    /* ANIMASI PEGAS */
    /* ========================================= */

    let stretch =
    massa * 0.35;

    spring.style.height =
    170 + stretch + "px";

    /* ========================================= */
    /* ANIMASI BEBAN */
    /* ========================================= */

    weight.style.top =
    280 + stretch + "px";

    /* ========================================= */
    /* UKURAN MASSA */
    /* ========================================= */

    let scale =
    1 + massa / 400;

    weight.style.transform =
    `translateX(-50%) scale(${scale})`;

    /* ========================================= */
    /* GOYANG */
    /* ========================================= */

    spring.classList.add("bounce");

    weight.classList.add("bounce");

    playSpring();

    setTimeout(() => {

        spring.classList.remove("bounce");

        weight.classList.remove("bounce");

    }, 1000);

    /* ========================================= */
    /* GLOW */
    /* ========================================= */

    spring.style.filter =
    "drop-shadow(0 0 20px #38BDF8)";

    weight.style.filter =
    "drop-shadow(0 0 25px #38BDF8)";

    /* ========================================= */
    /* STATUS */
    /* ========================================= */

    statusText.innerHTML =
    "Simulasi berhasil dijalankan 🚀";

});

/* ========================================= */
/* RESET */
/* ========================================= */

resetBtn.addEventListener("click", () => {

    playClick();

    /* ========================================= */
    /* RESET DATA */
    /* ========================================= */

    massa = 0;

    gaya = 0;

    pertambahan = 0;

    massaText.innerHTML =
    "0 g";

    gayaText.innerHTML =
    "0 N";

    panjangText.innerHTML =
    "0 cm";

    /* ========================================= */
    /* RESET STATUS */
    /* ========================================= */

    statusText.innerHTML =
    "Menunggu alat dipasang...";

    /* ========================================= */
    /* RESET TOOL */
    /* ========================================= */

    toolsInstalled = {

        stand: false,

        spring: false,

        weight: false

    };

    /* ========================================= */
    /* RESET POSISI */
    /* ========================================= */

    stand.style.left = "50%";
    stand.style.top = "45px";

    spring.style.left = "50%";
    spring.style.top = "120px";

    weight.style.left = "50%";
    weight.style.top = "280px";

    /* ========================================= */
    /* RESET STYLE */
    /* ========================================= */

    spring.style.height =
    "170px";

    weight.style.transform =
    "translateX(-50%) scale(1)";

    spring.style.filter =
    "none";

    weight.style.filter =
    "none";

});

/* ========================================= */
/* RESTART */
/* ========================================= */

restartBtn.addEventListener("click", () => {

    playClick();

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    document
    .getElementById("opening")
    .classList.add("active");

});

/* ========================================= */
/* FLOATING CARD EFFECT */
/* ========================================= */

const toolCards =
document.querySelectorAll(".tool-card");

toolCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const x = e.offsetX;

        const y = e.offsetY;

        card.style.transform =
        `
        rotateY(${x / 20}deg)
        rotateX(${y / 25}deg)
        scale(1.03)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "rotateY(0deg) rotateX(0deg)";

    });

});

/* ========================================= */
/* PARTICLE */
/* ========================================= */

function createParticle(){

    const particle =
    document.createElement("div");

    particle.classList.add("particle");

    document.body.appendChild(particle);

    let size =
    Math.random() * 6 + 2;

    particle.style.width =
    size + "px";

    particle.style.height =
    size + "px";

    particle.style.left =
    Math.random() * window.innerWidth
    + "px";

    particle.style.top =
    window.innerHeight + "px";

    particle.style.animationDuration =
    Math.random() * 5 + 5 + "s";

    setTimeout(() => {

        particle.remove();

    }, 10000);

}

setInterval(createParticle, 300);

/* ========================================= */
/* CONSOLE */
/* ========================================= */

console.log(
"%c✨ Virtual Lab Hukum Hooke Premium Aktif ✨",
`
color: #38BDF8;
font-size: 20px;
font-weight: bold;
`
);
