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
const timings = [
    0,
    420,
    840,
    1280,
    1720,
    2120,
    2560,
    3000,
    3440
];
function playLyrics(){
    // Remove previous glow
    document.querySelectorAll(".word").forEach(word=>{
        word.classList.remove("active");
    });
    // Schedule each lyric
    sequence.forEach((word,index)=>{
        setTimeout(()=>{
            document.querySelectorAll(".word").forEach(w=>{
                w.classList.remove("active");
            });
            document.getElementById(word).classList.add("active");
        },timings[index]);
    });
}
// Play immediately
playLyrics();
// Repeat after song phrase ends
setInterval(playLyrics,3700);