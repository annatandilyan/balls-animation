import Physic from "../physic.ts";
import {getRandomNumber} from "../utils.ts";

class Ball {
    /**
     * @property radius - radius of the ball
     * @private
     */
    private radius: number = 15;

    /**
     * @property Ec - elasticity, energy loss coefficient due to wallCollision
     * @private
     */
    private Ec: number = 0.75;

    /**
     * @property isMoving - true if the ball is moving
     */
    public isMoving: boolean = true;

    /**
     * @property vy - velocity in y direction
     * @private
     */
    private vy: number = 0;

    // private vx: number = 0;

    /**
     * @property color - color of the ball
     * @private
     */
    private color: string = `rgb(
        ${getRandomNumber(0, 255)}, 
        ${getRandomNumber(0, 255)}, 
        ${getRandomNumber(0, 255)}
    )`;

    /**
     * @constructor
     * @param x - x position
     * @param y - y position
     * @param area_width - width of the area to calculate collisions with vertical walls
     * @param area_height - height of the area to calculate collisions with horizontal walls
     */
    constructor(private x: number, private y: number, area_width: number, area_height: number) {
        this.correctXPosition(area_width);
        this.correctYPosition(area_height);
    }

    /**
     * draws the ball on the canvas
     * @param context - canvas context
     */
    public draw(context: CanvasRenderingContext2D | any) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }


    /**
     * moves the ball
     * @param height - height of the area to calculate collisions with horizontal walls
     * @param time_unit - time unit based on FPS to make it similar to the requestAnimationFrame
     */
    public move(height: number, time_unit: number) {
        this.vy = Physic.velocityByGravity(this.vy, time_unit);
        this.y = Physic.distance(this.vy, this.y, time_unit);
        // this.x -= this.vx;

        this.wallCollision(height);

        /** check if the ball is not moving
           -2.51 and -2.52 are the values of the velocity when the ball is not moving
           values are the result of experiments
        **/
        if (this.vy <= -2.51 && this.vy >= -2.52) {
            this.isMoving = false;
        }
    }

    /**
     * calculates the collision with the horizontal walls
     * @param height - height of the area to calculate collisions with horizontal walls
     * @private
     */
    private wallCollision(height: number) {
        // check horizontal walls collision
        if (this.radius + this.y > height) {
            // change the direction and apply energy loss
            this.vy *= -this.Ec;
            this.correctYPosition(height);
        }

        // ... check vertical walls collision
    }

    /**
     * calculates the collision with the horizontal walls and corrects position
     * if the ball is out of the area in time of the user click on the canvas
     * it will correct the position to the nearest wall
     * @param height - height of the area to calculate collisions with horizontal walls
     * @private
     */
    private correctYPosition(height: number) {
        // correct the position for top and bottom
        this.y = this.y < this.radius ? this.radius : Math.min(this.y, height - this.radius);
    }

    /**
     * calculates the collision with the horizontal walls and corrects position
     * if the ball is out of the area in time of the user click on the canvas
     * it will correct the position to the nearest wall
     * @param width
     * @private
     */
    private correctXPosition(width: number) {
        // correct the position for right and left;
        this.x = this.x < this.radius ? this.radius : Math.min(this.x, width - this.radius);
    }
}

export default Ball;
