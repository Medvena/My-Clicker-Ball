import { engine} from "./engine.js";
import { leftSlots, rightSlots } from "./slots.js";
import { updateScore } from "./game.js";
import { state } from "./gameState.js";

const overlay = document.getElementById("slotUIOverlay");

// BUTTONS
leftSlots.forEach((slot, i) => {
    const btn = document.createElement("button");
    btn.className = "slotBtn";
    btn.innerText = `Buy : ${slot.price} 🎱`;
    btn.id = "L" + i;
    btn.onmouseenter = () => btn.style.backgroundColor = "yellow";
    btn.onmouseleave = () => btn.style.backgroundColor = "#333";
    overlay.appendChild(btn);

    btn.onclick = () => buyCanon(slot, btn);
});

rightSlots.forEach((slot, i) => {
    const btn = document.createElement("button");
    btn.className = "slotBtn";
    btn.innerText = `Buy : ${slot.price} 🎱`;
    btn.id = "R" + i;
    btn.onmouseenter = () => btn.style.backgroundColor = "yellow";
    btn.onmouseleave = () => btn.style.backgroundColor = "#333";
    overlay.appendChild(btn);

    btn.onclick = () => buyCanon(slot, btn);
});

function updateSlotUI() {

    leftSlots.forEach((slot, i) => {
        const btn = document.getElementById("L"+i);
        btn.style.left = (slot.x - 200) + "px"; // at the right of the slot
        btn.style.top  = (slot.y - 28) + "px";
    });

    rightSlots.forEach((slot, i) => {
        const btn = document.getElementById("R"+i);
        btn.style.left = (slot.x - 0) + "px"; // at the left of the slot
        btn.style.top  = (slot.y - 28) + "px";
    });
}

Matter.Events.on(engine, "afterUpdate", () => {
    updateSlotUI();
});

function buyCanon(slot, btn) {
    if(score < slot.price) return;
    state.score -= slot.price;
    updateScore();

    btn.disabled = true;
    btn.style.opacity = 0.3;
}