import { eventSource, event_types } from "../../../../script.js";

jQuery(async () => {
    // Prevent duplicate sprites from spawning
    if (document.getElementById('floating-thinker-sprite')) return;

    const sprite = document.createElement('img');
    sprite.src = '/scripts/extensions/floating-sprite/thinking.gif';
    sprite.id = 'floating-thinker-sprite';
    document.body.appendChild(sprite);

    let generationTimer = null; // Our delay timer

    // The ON and OFF commands
    const showSprite = () => sprite.classList.add('active-thinking');
    
    const hideSprite = () => {
        // If a stop event fires BEFORE our timer finishes, cancel the spawn command!
        if (generationTimer) {
            clearTimeout(generationTimer);
            generationTimer = null;
        }
        sprite.classList.remove('active-thinking');
    };

    // 1. Trigger: The API starts writing
    if (event_types.GENERATION_STARTED) {
        eventSource.on(event_types.GENERATION_STARTED, (context) => {
            // Safety Check 1: Ignore hidden/background API connection pings
            if (context && (context.quiet || context === 'quiet')) return;

            // Safety Check 2: Wait 400ms before showing the GIF. 
            // If it's a fake API ping, it will be cancelled before it ever shows up.
            generationTimer = setTimeout(() => {
                showSprite();
            }, 400);
        });
    }

    // 2. Shutoff Triggers
    if (event_types.GENERATION_STOPPED) eventSource.on(event_types.GENERATION_STOPPED, hideSprite);
    if (event_types.MESSAGE_RECEIVED) eventSource.on(event_types.MESSAGE_RECEIVED, hideSprite);
    if (event_types.MESSAGE_SWIPED) eventSource.on(event_types.MESSAGE_SWIPED, hideSprite);
    if (event_types.CHAT_CHANGED) eventSource.on(event_types.CHAT_CHANGED, hideSprite);
});
