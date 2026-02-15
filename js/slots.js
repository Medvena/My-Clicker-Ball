import { engine, World, Bodies } from "./engine.js";

// SLOTS
export const leftSlots = [
    {x: 0, y: 130, canon: null, price: 1},
    {x: 0, y: 230, canon: null, price: 1000},
    {x: 0, y: 330, canon: null, price: 4000},
    {x: 0, y: 430, canon: null, price: 16000},
];
export const rightSlots = [
    {x: 800, y: 180, canon: null, price: 500},
    {x: 800, y: 280, canon: null, price: 2000},
    {x: 800, y: 380, canon: null, price: 8000},
    {x: 800, y: 480, canon: null, price: 32000},
];
function drawSlots(slots, color) {
    slots.forEach(slot => {
        const slotBody = Bodies.rectangle(slot.x, slot.y, 30, 30, {
            isStatic: true,
            isSensor: true,
            render: {
                fillStyle: color,
                opacity: 1
            }

        });
        World.add(engine.world, slotBody);
        slot.body = slotBody; // debug / future use
    });
}
drawSlots(leftSlots, "#ffffff");
drawSlots(rightSlots, "#ffffff");