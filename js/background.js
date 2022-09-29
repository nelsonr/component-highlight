const env = chrome || browser;

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);

    return tab;
}

env.runtime.onMessage.addListener((message) => {
    console.log(message);

    getCurrentTab().then(
        (tab) => {
            if (tab) {
                // Popup requests a list of
                // components in the page
                if (message.action === "get") {
                    env.tabs.sendMessage(tab.id, {
                        action: "get",
                    });
                }

                if (message.action === "highlight") {
                    env.tabs.sendMessage(tab.id, message);
                }
            }
        },
        (error) => console.error(error)
    );
});
