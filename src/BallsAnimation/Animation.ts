import Ball from "./Ball.ts";

class Animation {
    /**
     * @property balls - array of balls
     * @private
     */
    private balls: Ball[] = [];

    /**
     * @property FPS - frames per second
     * @private
     */
    private FPS: number = 60;

    /**
     * @property TIME_UNIT - time unit based on FPS to make it similar to the requestAnimationFrame
     * @private
     */
    private TIME_UNIT: number = this.FPS / 100;

    /**
     * @property context - canvas context
     * @private
     */
    private readonly context: CanvasRenderingContext2D;

    /**
     * @property animationRequestId - animation request id
     * @private
     */
    private animationRequestId: number = 0;

    /**
     * @constructor
     * @param canvas - canvas element
     */
    public constructor(private readonly canvas: HTMLCanvasElement | any) {
        this.context = this.canvas.getContext('2d');
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
     * @private
     * @returns true if there is any ball moving
     */
    private shouldAnimate() {
        for (let ball of this.balls) {
            if (ball.isMoving) {
                return true;
            }
        }
        return false;
    }

    /**
     * animation function
     * responsible for periodic animation function calls for drawing and moving balls based on FPS
     * @private
     */
    private animate() {
        const shouldAnimate = this.shouldAnimate();

        /**
         * if there is any ball moving animation will continue
         * otherwise animation will be canceled, because the animation is unnecessary
         */
        if (shouldAnimate) {
            this.animationRequestId = requestAnimationFrame(this.animate.bind(this));

            // clear rect
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // draw balls
            this.balls.forEach(ball => ball.draw(this.context));

            // move
            this.balls.forEach(ball => ball.move(this.canvas.height, this.TIME_UNIT));
        } else {
            // canceling animation when there is no ball moving
            cancelAnimationFrame(this.animationRequestId);
            this.animationRequestId = 0;
        }
    }

    /**
     * initializes the animation by adding canvas event listener
     * @public
     * @returns void
     */
    public init() {
        this.canvas.onclick = (event: MouseEvent) => {
            this.createBall(event.offsetX, event.offsetY);

            /**
             * if there is no animation running, start the animation
             * this ensures the animation start only when the user clicked on the canvas
             * if there is animationRequestID, it means the animation is running and there is no need to duplicate
             */
            if (!this.animationRequestId) {
                this.animate();
            }
        }
    }
}

export default Animation;
