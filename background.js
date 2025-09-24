

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === "muteTab") {
        chrome.tabs.update(sender.tab.id, {muted: !sender.tab.mutedInfo.muted})
    }
});