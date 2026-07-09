const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", e => {
    mouseX = (e.clientX / w - 0.5) * 2;
    mouseY = (e.clientY / h - 0.5) * 2;
});

const spacing = 14;
const dotSize = 1.6;

let time = 0;

function draw() {

    ctx.clearRect(0,0,w,h);

    ctx.fillStyle = "white";

    for(let y=0; y<h+spacing; y+=spacing){

        for(let x=0; x<w+spacing; x+=spacing){

            // Horizontal wave
            const wave =
                Math.sin((x*0.02)+time+y*0.015)*18 +
                Math.sin((x*0.008)-time*0.8)*12;

            // Mouse parallax
            const offsetX = mouseX * (y / h) * 40;
            const offsetY = mouseY * (x / w) * 15;

            ctx.beginPath();
            ctx.arc(
                x + offsetX,
                y + wave + offsetY,
                dotSize,
                0,
                Math.PI*2
            );
            ctx.fill();
        }
    }

    time += 0.015;
    requestAnimationFrame(draw);
}

draw();
