import { eventSource, event_types } from "../../../../script.js";

jQuery(async () => {
    // Prevent duplicate fairies from spawning if the UI reloads
    if (document.getElementById('floating-thinker-sprite')) return;

    const sprite = document.createElement('img');
    sprite.src = '/scripts/extensions/floating-sprite/thinking.gif';
    sprite.id = 'floating-thinker-sprite';
    document.body.appendChild(sprite);

    // The ON and OFF commands
    const showSprite = () => sprite.classList.add('active-thinking');
    const hideSprite = () => sprite.classList.remove('active-thinking');

    // 1. Trigger: The API starts writing
    if (event_types.GENERATION_STARTED) {
        eventSource.on(event_types.GENERATION_STARTED, showSprite);
    }

    // 2. Trigger: The user manually clicks the Stop button
    if (event_types.GENERATION_STOPPED) {
        eventSource.on(event_types.GENERATION_STOPPED, hideSprite);
    }

    // 3. Trigger: The API successfully finishes writing on its own
    if (event_types.MESSAGE_RECEIVED) {
        eventSource.on(event_types.MESSAGE_RECEIVED, hideSprite);
    }

    // 4. Extra Safety Nets (Forces the fairy to hide if you swipe to a new reply, change chats, or an error occurs)
    if (event_types.MESSAGE_SWIPED) {
        eventSource.on(event_types.MESSAGE_SWIPED, hideSprite);
    }
    if (event_types.CHAT_CHANGED) {
        eventSource.on(event_types.CHAT_CHANGED, hideSprite);
    }
});
