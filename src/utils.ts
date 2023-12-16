/**
 * @param min - range minimum value
 * @param max - range maximum value
 * @returns a random number between min and max
 */
export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}
