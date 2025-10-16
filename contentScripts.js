document.addEventListener("keydown", function(event) {
    

    if(event.key === "u" && (event.ctrlKey || event.metaKey) && event.shiftKey) {
        chrome.runtime.sendMessage({action: "muteAllTabs"})
    }
    
    else if (event.key === "x" && (event.ctrlKey || event.metaKey) && event.shiftKey === false) {
        chrome.runtime.sendMessage({action: "muteTab"})
    }

    else if (event.key === "x" && (event.ctrlKey || event.metaKey) && event.shiftKey === true) {
        chrome.runtime.sendMessage({action: "muteAllTabsExceptCurr"})
    }
})