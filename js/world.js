import { engine, World, Bodies } from "./engine.js";
import { state } from "./gameState.js";

// CREATE WALLS
const wall_color = "#59595e";

const walls = [
    Bodies.rectangle(400, 0, 800, 20, {
        isStatic: true,
        render: { fillStyle: wall_color }
    }), // roof
    Bodies.rectangle(0, 300, 20, 600, {
        isStatic: true,
        render: { fillStyle: wall_color }
    }), // left wall
    Bodies.rectangle(800, 300, 20, 600, {
        isStatic: true,
        render: { fillStyle: wall_color }
    }) // right wall
];

World.add(engine.world, walls);

// GROUND

export const groundLeft = Bodies.rectangle(100 -  state.holeSize / 2, 580, 600, 40, {
    isStatic: true,
    render: { fillStyle: wall_color }
});

export const groundRight = Bodies.rectangle(650 +  state.holeSize / 2, 580, 500, 40, {
    isStatic: true,
    render: { fillStyle: wall_color }
});

World.add(engine.world, [groundLeft, groundRight]);

// HOLE
export const hole = Bodies.rectangle(400, 590,  state.holeSize, 20, {
    isStatic: true,
    isSensor: true,
    render: { fillStyle: "black" }
});

World.add(engine.world, hole);

export function updateHole() {
    Matter.Body.setPosition(groundLeft, { x: 100 - state.holeSize / 2, y: 580 });
    Matter.Body.setPosition(groundRight, { x: 650 + state.holeSize / 2, y: 580 });
    Matter.Body.setPosition(hole, { x: 400, y: 590 , width: state.holeSize});
}