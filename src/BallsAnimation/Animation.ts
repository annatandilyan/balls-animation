import Ball from "./Ball.ts";

class Animation {
    /**
     * @property balls - array of balls
     * @private
     */
    private balls: Ball[] = [];

    /**
     * @property context - canvas context
     * @private
     */
    private readonly context: CanvasRenderingContext2D;
    private lastTime: number = 0;

    /**
     * @constructor
     * @param canvas - canvas element
     */
    public constructor(private readonly canvas: HTMLCanvasElement | any) {
        this.context = this.canvas.getContext('2d');
        this.canvas.onclick = (event: MouseEvent) => {
            this.createBall(event.offsetX, event.offsetY);
        }
    }


    /**
     * creates a ball and adds it to the balls array
     * @param x - x position
     * @param y - y position
     * @public
     */
    public createBall(x: number, y: number) {
        this.balls.push(new Ball(x, y, this.canvas.width, this.canvas.height));
    }


    /**
     * animation function
     * responsible for periodic animation function calls for drawing and moving balls based on FPS
     * @private
     */
    private animate(currentTime: number) {
        const dTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        // clear rect
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw balls
        this.balls.forEach(ball => ball.draw(this.context));
        // move
        this.balls.forEach(ball => ball.move(this.canvas.height, dTime * 0.02));
        requestAnimationFrame(this.animate.bind(this));
    }

    /**
     * initializes the animation by adding canvas event listener
     * @public
     * @returns void
     */
    public start() {
        this.lastTime = performance.now();
        requestAnimationFrame(this.animate.bind(this));
    }
}

export default Animation;
