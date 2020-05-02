import Square from '/js/square.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;

const graph = new OffscreenCanvas(800, 800);
const simulation = new OffscreenCanvas(800, 800);
const simulationCtx = simulation.getContext('2d');

const population = 800;

const arr = [];
let iteration = 0;

// Generation a population
for (let i = 0; i < population; i++) {
    arr[i] = new Square(simulationCtx, Math.random() > 0.5);
}

// Auxiliar Function to Draw a Chart
function drawGraph(canvas) {
    const ctx = canvas.getContext('2d');
    let infect = 0;

    for (let i = 0; i < population; i++) {
        if (arr[i].infected) infect++;
    }

    let healt = arr.length - infect;

    // Draw a line from the top of canvas (the chart as well)
    // to the percentage of non-infected squares
    ctx.beginPath();
    ctx.moveTo(iteration + 1, 0);
    ctx.lineTo(iteration + 1, healt);
    ctx.closePath();
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Draw a line from the last non-infected all the way to
    // the bootom of the Chart
    ctx.beginPath();
    ctx.moveTo(iteration + 1, healt);
    ctx.lineTo(iteration + 1, 800);
    ctx.closePath();
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // At the end these two lines represent 100% of population
    // and ilustrate well the state of population

    // Make the Axis for the chart
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 800);
    ctx.moveTo(0, 800);
    ctx.lineTo(800, 800);
    ctx.closePath();
    ctx.stroke();
}

// Magic
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(arr[0].deltaTime > arr[0].time - 1) simulationCtx.clearRect(0, 0, simulation.width, simulation.height);

    drawGraph(graph);
    context.drawImage(graph, 900, 40);

    arr.forEach(square => {
        square.update();
        square.show();

    });

    context.drawImage(simulation, 20, 40);

    context.rect(20, 40, 800, 800);
    context.strokeStyle = 'white';
    context.stroke();

    iteration++;
    if (iteration > 800) iteration = 0;
    requestAnimationFrame(update);
}

update();