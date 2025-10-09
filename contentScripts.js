document.addEventListener("keydown", function(event) {
    

    if(event.key === "u" && (event.ctrlKey || event.metaKey) && event.shiftKey) {
        chrome.runtime.sendMessage({action: "muteAllTabs"})
    }
    
    else if (event.key === "x" && (event.ctrlKey || event.metaKey)) {
        chrome.runtime.sendMessage({action: "muteTab"})
    }
})