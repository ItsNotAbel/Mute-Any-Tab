

chrome.runtime.onMessage.addListener(async (message, sender) => {
    if (message.action === "muteTab") {
        chrome.tabs.update(sender.tab.id, {muted: !sender.tab.mutedInfo.muted})
    }

    else if (message.action === "muteAllTabs") {
        
        await console.log(checkAllMuted())
        chrome.tabs.query({currentWindow: true}, (tab)=>{
            if (checkAllMuted() === true) { // If all tabs are muted or unmuted it then toggles mute for all tabs
                for (let i = 0; i < tab.length; i++) {
                    chrome.tabs.update(tab[i].id, {muted: !tab[i].mutedInfo.muted})
                }
            }

            else if (sender.tab.mutedInfo.muted === true)  { // Checks if current tab is muted, if so unmutes all tabs
                for (let i = 0; i < tab.length; i++) {
                    if (tab[i].mutedInfo.muted === false) { // Checks if current tab in loop is unmuted, if so it mutes
                        chrome.tabs.update(tab[i].id, {muted: true})
                    }
                }
                }
            else {
                for (let i = 0; i < tab.length; i++) { // Checks if current tab is unmuted, if so unmutes all tabs
                    if (tab[i].mutedInfo.muted === true) { // Checks if current tab in loop is muted, if so it unmutes
                        chrome.tabs.update(tab[i].id, {muted: false})
                    }
                }
            }
        })
        }
    });

async function checkAllMuted() { // Function to check all tabs, if all tabs are muted/unmuted
    
    let countF = 0;
    let countT = 0;
    let size = 0;

    await chrome.tabs.query({currentWindow: true}, (tab) =>{

        size = tab.length;
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].mutedInfo.muted) {
                countT++;
            }

            else {
                countF++;
            }
    }

        
    }
    )

    if (countF === size || countT === size) {
            return true;
     }

    else {
        return false;
    }
}