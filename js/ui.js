import { engine} from "./engine.js";
import { Slots } from "./slots.js";
import {increaseHoleSize, updateScore} from "./game.js";
import { state } from "./gameState.js";
import { createCannon } from "./game.js";

const overlay = document.getElementById("slotUIOverlay");
const colorButtonMoused = "#bebebe"

// BUTTONS
Slots.forEach((slot, i) => {
    const btn = document.createElement("button");
    btn.className = "slotBtn";
    btn.innerText = `Buy : ${slot.price} 🎱`;
    btn.id = "bp_buy" + i;
    if (slot.side === "left") {
        btn.style.left = (slot.x - 200) + "px"; // at the right of the slot
    }
    else {
        btn.style.left = (slot.x - 0) + "px"; // at the left of the slot
    }
    btn.onmouseenter = () => btn.style.backgroundColor = colorButtonMoused ;
    btn.onmouseleave = () => btn.style.backgroundColor = "#333";
    btn.style.top  = (slot.y - 28) + "px";

    btn.style.opacity = '0.3';
    btn.disabled = true;

    overlay.appendChild(btn);

    btn.onclick = () => buyCanon(slot, btn);
});

export function updateSlotUI() {
    Slots.forEach((slot, i) => {
        const btn = document.getElementById("bp_buy"+i);
        if (state.score >= slot.price && slot.canon == null) {
            btn.disabled = false;
            btn.style.opacity = '1';
        }
         else {
            btn.disabled = true;
            btn.style.opacity = '0.3';
        }
    });
}

function buyCanon(slot, btn) {
    if(state.score < slot.price) return;
    state.score -= slot.price;
    updateScore();

    slot.canon = createCannon(slot.x, slot.y, slot.side);

    btn.disabled = true;
    btn.style.opacity = 0.3;
}

const btn2 = document.createElement("button");
btn2.className = "slotBtn";
btn2.innerText = `Increase : 100 🎱`;
btn2.id = "Increase_Hole";

btn2.style.left = 300 + "px";
btn2.onmouseenter = () => btn2.style.backgroundColor = colorButtonMoused ;
btn2.onmouseleave = () => btn2.style.backgroundColor = "#333";
btn2.style.top  = 610 + "px";

btn2.style.opacity = '1';

overlay.appendChild(btn2);

btn2.onclick = () => increaseHoleSize();