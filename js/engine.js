import { state } from "./gameState.js";

export const Engine = Matter.Engine;
export const Render = Matter.Render;
export const World = Matter.World;
export const Bodies = Matter.Bodies;
export const Runner = Matter.Runner;

export const engine = Engine.create();
engine.world.gravity.y = state.gravity;

export const render = Render.create({
    element: document.getElementById("canvas-container"),
    engine,
    options: { width: 800, height: 600, wireframes: false }
});

Render.run(render);
export const runner = Runner.create();
Runner.run(runner, engine);