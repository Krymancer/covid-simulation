export default class Square {
    constructor(context, infected) {
        this.context = context;
        this.infected = infected;

        this.x = rnd(10, 790);
        this.y = rnd(10, 790);

        this.width = 10;
        this.height = 10;

        this.imune = 0.1;

        this.delayToInfect = 20;
        this.tickInfect = 0;

        this.deltaTime = 0;
        this.time = 5;
    }

    update() {
        this.move();

        if (this.infected) {
            this.infected = Math.random() > this.imune;
            this.imune += 0.001;
        } else {
            this.infected = Math.random() > 0.5;
        }

        this.deltaTime++;
    }

    move() {
        if (Math.random() > 0.5) {
            this.x += 5;
            if (Math.random() > 0.5) {
                this.y += 5;
            } else {
                this.y -= 5;
            }
        } else {
            this.x -= 5;
            if (Math.random() > 0.5) {
                this.y += 5;
            } else {
                this.y -= 5;
            }
        }
    }

    show() {
        if (this.deltaTime > this.time) { // A trick to avoid flicking, because the infection rate is super fast
            this.context.fillRect(this.x, this.y, this.width, this.height);
            this.context.fillStyle = this.infected ? 'red' : 'blue';
            this.deltaTime = 0;
        }

    }

}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
