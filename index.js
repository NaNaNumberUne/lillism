import { eventSource, event_types } from "../../../../script.js";

jQuery(async () => {
    // Prevents duplicate sprites from spawning if the UI reloads
    if (document.getElementById('floating-thinker-sprite')) return;

    const sprite = document.createElement('img');
    // Points to the clean self-contained path we updated earlier
    sprite.src = '/scripts/extensions/floating-sprite/thinking.gif';
    sprite.id = 'floating-thinker-sprite';
    document.body.appendChild(sprite);

    // Turn ON when the AI starts writing
    eventSource.on(event_types.GENERATION_STARTED, () => {
        sprite.classList.add('active-thinking');
    });

    // Turn OFF function
    const removeSprite = () => {
        sprite.classList.remove('active-thinking');
    };

    // Safety hooks to catch EVERY possible way a message can stop generating
    eventSource.on(event_types.GENERATION_STOPPED, removeSprite); // User manually clicks stop
    eventSource.on(event_types.GENERATION_ENDED, removeSprite);   // AI naturally finishes streaming or hits an error
    eventSource.on(event_types.MESSAGE_RECEIVED, removeSprite);   // Message fully registers in the UI chat log
});
