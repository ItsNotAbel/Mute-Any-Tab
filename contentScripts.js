document.addEventListener("keydown", function(event) {
    if (event.key === "m" & event.ctrlKey) {
        chrome.runtime.sendMessage({action: "muteTab"})
    }
})