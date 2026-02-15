import { engine, World, Bodies } from "./engine.js";
import { state } from "./gameState.js";

// CANON
const ball_color = "red";
const cannonPos = { x: 800, y: 180 };
let cannonAngle = Math.PI/4;

const cannon = Bodies.rectangle(cannonPos.x, cannonPos.y, 80, 30, {
    isStatic: true,
    angle: cannonAngle,
    render: {
        fillStyle: ball_color
    }
})
World.add(engine.world, cannon);


// CANNON ANIMATION
let t = 0;
Matter.Events.on(engine, "beforeUpdate", () => {
    t += 0.02;
    const angle = Math.PI/4 + Math.sin(t)*0.2;
    Matter.Body.setAngle(cannon, angle);
    cannonAngle = angle;
});

// CANNON RECOIL
let recoilOffset = 0;
function recoilCannon() {
    recoilOffset = 10;
}
Matter.Events.on(engine, "beforeUpdate", () => {
    recoilOffset *= 0.85; // recoil

    const x = cannonPos.x + Math.cos(cannonAngle) * recoilOffset;
    const y = cannonPos.y + Math.sin(cannonAngle) * recoilOffset;

    Matter.Body.setPosition(cannon, { x, y });
});

// SPAWN BALL
function spawnBall() {
    const length = 80; // cannon length
    const offset = length / 2 + 15; // +15 = launch out of the cannon

    const x = cannon.position.x - Math.cos(cannonAngle) * offset;
    const y = cannon.position.y - Math.sin(cannonAngle) * offset;

    const ball = Bodies.circle(x, y, state.ballRadius, {
        restitution: 0.9,
        friction: 0,
        frictionAir: 0.001,
        density: 0.001,
        render: { fillStyle: ball_color }
    });

    Matter.Body.setVelocity(ball, {
        x: Math.cos(cannonAngle) * state.speed,
        y: Math.sin(cannonAngle) * state.speed
    });

    World.add(engine.world, ball);
}

// CLICK
document.addEventListener("click", () => {
    spawnBall()
    recoilCannon()
});