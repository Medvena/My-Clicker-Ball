import { engine, World } from "./engine.js";
import { hole } from "./world.js";
import { state } from "./gameState.js";

export function updateScore() {
    document.getElementById("score").innerText = `🎱 ${state.score}`;
}

Matter.Events.on(engine, "collisionStart", e => {
    e.pairs.forEach(pair => {
        if(pair.bodyA === hole || pair.bodyB === hole) {
            const ball = pair.bodyA === hole ? pair.bodyB : pair.bodyA;
            World.remove(engine.world, ball);
            state.score++;
            updateScore();
        }
    });
});

updateScore();