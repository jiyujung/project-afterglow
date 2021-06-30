const body = document.querySelector('body');
let scrollPosition = 0;
const modal = document.getElementById("modal");
modal.style.display = "none"
const modal2 = document.getElementById("modal2");
modal2.style.display = "none";
const mag1 = document.getElementById("modal_mag_1");
mag1.style.display = "none";
const mag2 = document.getElementById("modal_mag_2");
mag2.style.display = "none";
const mag3 = document.getElementById("modal_mag_3");
mag3.style.display = "none";
const mag4= document.getElementById("modal_mag_4");
mag4.style.display = "none";

function modalOn() {
    modal.style.display = "flex";
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
}

function isModalOn() {
    return modal.style.display === "flex";
}

function modalOff() {
    modal.style.display = "none";
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}
const btnModal = document.getElementById("btn_modal");
btnModal.addEventListener("click", e => {
    modalOn();
})
const closeBtn = modal.querySelector(".close_area");
closeBtn.addEventListener("click", e => {
    modalOff();
})
modal.addEventListener("click", e => {
    const evTarget = e.target;
    if (evTarget.classList.contains("modal_overlay")) {
        modalOff();
    }
})
window.addEventListener("keyup", e => {
    if (isModalOn() && e.key === "Escape") {
        modalOff();
    }
})

function modal2On() {
    modal2.style.display = "block";
}

function isModal2On() {
    return modal2.style.display === "block";
}

function modal2Off() {
    modal2.style.display = "none";
}
const btnModal2 = document.getElementById("btn_modal2")
btnModal2.addEventListener("click", e => {
    modal2On();
})
const closeBtn2 = modal.querySelector(".close_area2")
closeBtn2.addEventListener("click", e => {
    modal2Off();
})

function mag1On() {
    mag1.style.display = "flex";
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
}

function ismag1On() {
    return mag1.style.display === "flex";
}

function mag1Off() {
    mag1.style.display = "none";
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}

const mag_1 = document.getElementById("mag_1")
mag_1.addEventListener("click", e => {
    mag1On();
})

const closeBtn3 = mag1.querySelector(".close_area3")
closeBtn3.addEventListener("click", e => {
    mag1Off();
})

function mag2On() {
    mag2.style.display = "flex";
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
}

function ismag2On() {
    return mag2.style.display === "flex";
}

function mag2Off() {
    mag2.style.display = "none";
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}

const mag_2 = document.getElementById("mag_2")
mag_2.addEventListener("click", e => {
    mag2On();
})

const closeBtn4 = mag2.querySelector(".close_area4")
closeBtn4.addEventListener("click", e => {
    mag2Off();
})

function mag3On() {
    mag3.style.display = "flex";
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
}

function ismag3On() {
    return mag3.style.display === "flex";
}

function mag3Off() {
    mag3.style.display = "none";
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}

const mag_3 = document.getElementById("mag_3")
mag_3.addEventListener("click", e => {
    mag3On();
})

const closeBtn5 = mag3.querySelector(".close_area5")
closeBtn5.addEventListener("click", e => {
    mag3Off();
})

function mag4On() {
    mag4.style.display = "flex";
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
}

function ismag4On() {
    return mag3.style.display === "flex";
}

function mag4Off() {
    mag4.style.display = "none";
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}

const mag_4 = document.getElementById("mag_4")
mag_4.addEventListener("click", e => {
    mag4On();
})

const closeBtn6 = mag4.querySelector(".close_area6")
closeBtn6.addEventListener("click", e => {
    mag4Off();
})