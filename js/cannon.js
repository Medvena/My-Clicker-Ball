import { engine, World, Bodies } from "./engine.js";
import { state } from "./gameState.js";

export class Cannon {
    constructor(x, y, side) {
        this.pos = { x, y };
        this.side = side; // left or right
        // -45 degrees for left, -135 degrees for right
        this.baseAngle = side === 'left' ? -Math.PI / 4 : -3 * Math.PI / 4;
        this.angle = this.baseAngle;

        this.t = Math.random() * 10;
        this.recoil = 0;

        this.body = Bodies.rectangle(x, y, 80, 30, {
            isStatic: true,
            angle: this.angle,
            render: { fillStyle: "red" }
        });

        World.add(engine.world, this.body);
    }

    update() {
        // idle animation
        this.t += 0.05; // animation speed
        const offset = Math.sin(this.t) * 0.2;
        this.angle = this.baseAngle + offset;
        Matter.Body.setAngle(this.body, this.angle);

        // recoil damping
        this.recoil *= 0.85; // damping factor
        const x = this.pos.x - Math.cos(this.angle) * this.recoil;
        const y = this.pos.y - Math.sin(this.angle) * this.recoil;
        Matter.Body.setPosition(this.body, { x, y });
    }

    shoot() {
        const length = 80;
        const distFromCenter = length / 2 + state.ballRadius + 5;

        const x = this.body.position.x + Math.cos(this.angle) * distFromCenter;
        const y = this.body.position.y + Math.sin(this.angle) * distFromCenter;

        const ball = Bodies.circle(x, y, state.ballRadius, {
            restitution: 0.9,
            friction: 0,
            frictionAir: 0.001,
            density: 0.001,
            render: { fillStyle: "red" }
        });

        Matter.Body.setVelocity(ball, {
            x: Math.cos(this.angle) * state.speed,
            y: Math.sin(this.angle) * state.speed
        });

        World.add(engine.world, ball);
        this.recoil = 15; // damping value
    }
}