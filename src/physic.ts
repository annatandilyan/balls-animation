class Physic {
    /**
     * acceleration due to Gravity
     */
    static G = 9.8; // m /s ^ 2;

    /**
     *
     * @param Vi initial velocity m/s
     * @param T current time
     * @returns velocity
     */
    static velocityByGravity(Vi: number, T: number): number {
        // V = Vi + a * T where a is equal to acceleration
        return Vi + Physic.G * T;
    }


    /**
     * calculates the distance due to acceleration
     * S = Si + (a * T^2) / 2
     * where S = distance, Si = initial distance, a = acceleration, T = time
     * where a = G = 9.8 m/s^2 or V/T
     * @param V velocity
     * @param Di initial distance
     * @param T current time
     * @returns distance
     */
    static distance(V: number, Di: number, T: number): number {
        return Di + (V * T) / 2;
    }
}

export default Physic;
