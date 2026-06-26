/* ===========================================
   BTS - THEY DON'T KNOW 'BOUT US
   SCRIPT.JS
=========================================== */

/* ---------- ELEMENTS ---------- */

const words = [
    document.getElementById("ooh"),
    document.getElementById("damn"),
    document.getElementById("right"),
    document.getElementById("yeah")
];

const arrow = document.getElementById("arrow");
const progress = document.getElementById("progress");

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

/* ---------- CANVAS ---------- */

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* ---------- LYRIC ORDER ---------- */

const sequence = [

    "yeah",
    "damn",
    "ooh",
    "damn",
    "right",
    "ooh",
    "damn",
    "right",
    "yeah"

];

/* ---------- SETTINGS ---------- */

const beatDuration = 450; // milliseconds

let currentIndex = 0;

/* ===========================================
   MOVE ARROW
=========================================== */

function moveArrow(target){

    const rect = target.getBoundingClientRect();

    arrow.style.left =
        (rect.left + rect.width / 2 - 55) + "px";

    arrow.style.top =
        (rect.top + rect.height / 2) + "px";

}

/* ===========================================
   ACTIVE WORD
=========================================== */

function activateWord(){

    document
        .querySelectorAll(".word")
        .forEach(word => {

            word.classList.remove("active");

        });

    const active =
        document.getElementById(
            sequence[currentIndex]
        );

    active.classList.add("active");

    moveArrow(active);

}

/* ===========================================
   PROGRESS BAR
=========================================== */

function updateProgress(){

    const percent =
        ((currentIndex + 1) /
        sequence.length) * 100;

    progress.style.width =
        percent + "%";

}

/* ===========================================
   NEXT LYRIC
=========================================== */

function nextBeat(){

    activateWord();

    updateProgress();

    currentIndex++;

    if(currentIndex >= sequence.length){

        currentIndex = 0;

        progress.style.width = "0%";

    }

}
/* ===========================================
   PARTICLES
=========================================== */

const particles = [];

function createParticle(x, y){

    particles.push({

        x: x,
        y: y,

        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,

        size: Math.random() * 3 + 1,

        alpha: 1

    });

}

function updateParticles(){

    for(let i = particles.length - 1; i >= 0; i--){

        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.alpha -= 0.02;

        ctx.beginPath();
        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );
        ctx.fillStyle =
            `rgba(199,125,255,${p.alpha})`;
        ctx.fill();
        if(p.alpha <= 0){
            particles.splice(i,1);
        }
    }
}

/* ===========================================
   SPARKLES AROUND ACTIVE WORD
=========================================== */
function emitSparkles(){
    const active =
        document.getElementById(
            sequence[currentIndex]
        );
    const rect =
        active.getBoundingClientRect();
    for(let i=0;i<4;i++){
        createParticle(
            rect.left +
            rect.width/2,
            rect.top +
            rect.height/2
        );
    }
}

/* ===========================================
   TWINKLING STARS
=========================================== */

const stars = [];
for(let i=0;i<120;i++){
    stars.push({
        x:Math.random()*window.innerWidth,
        y:Math.random()*window.innerHeight,
        size:Math.random()*2+1,
        alpha:Math.random()
    });
}
function drawStars(){
    stars.forEach(star=>{
        star.alpha +=
            (Math.random()-0.5)*0.05;
        if(star.alpha>1) star.alpha=1;
        if(star.alpha<0.2) star.alpha=0.2;
        ctx.beginPath();
        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI*2
        );
        ctx.fillStyle=
            `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
    });
}
/* ===========================================
   ANIMATION LOOP
=========================================== */

function animate(){
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
    );
    drawStars();
    updateParticles();
    requestAnimationFrame(animate);
}
animate();
/* ===========================================
   MAIN LOOP
=========================================== */

activateWord();
updateProgress();
setInterval(()=>{
    emitSparkles();
    nextBeat();
},beatDuration);
