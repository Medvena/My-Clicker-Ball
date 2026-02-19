import { engine, World } from "./engine.js";
import { hole, updateHole } from "./world.js";
import { state } from "./gameState.js";
import { updateSlotUI } from "./ui.js";
import { Cannon } from "./cannon.js";

const cannons = [];

export function updateScore() {
    document.getElementById("score").innerText = `🎱 ${state.score}`;
    updateSlotUI();
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

export function createCannon(x, y, side) {
    const c = new Cannon(x, y, side);
    cannons.push(c);
    return c;
}

// UPDATE LOOP
Matter.Events.on(engine, "beforeUpdate", () => {
    cannons.forEach(c => c.update());
});

// SHOOT ALL
document.addEventListener("click", () => {
    cannons.forEach(c => c.shoot());
});

export function increaseHoleSize(){
    state.holeSize += 10 ;
    console.log(state.holeSize);
    updateHole();

}