import { eventSource, event_types } from "../../../../script.js";

jQuery(async () => {
    // Prevents duplicate sprites from spawning if the UI reloads
    if (document.getElementById('floating-thinker-sprite')) return;

    const sprite = document.createElement('img');
    sprite.src = '/scripts/extensions/floating-sprite/thinking.gif';
    sprite.id = 'floating-thinker-sprite';
    document.body.appendChild(sprite);

    // Turn ON when the AI starts writing
    eventSource.on(event_types.GENERATION_STARTED, () => {
        sprite.classList.add('active-thinking');
    });

    // Turn OFF functions
    const removeSprite = () => {
        sprite.classList.remove('active-thinking');
    };

    // Multiple safety nets to force it to hide when done or interrupted
    eventSource.on(event_types.GENERATION_STOPPED, removeSprite);
    eventSource.on(event_types.MESSAGE_RECEIVED, removeSprite);
});
