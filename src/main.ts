import BallsAnimation from "./BallsAnimation";

import "./style.css"

function main() {
    const animation = new BallsAnimation(
        document.querySelector('#canvas_area')
    );
    animation.init();
}

main();

