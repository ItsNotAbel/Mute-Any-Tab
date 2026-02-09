// Class to handle all muting mechanisms

chrome.runtime.onMessage.addListener(async (message, sender) => { // Toggles mute for current tab
    if (message.action === "muteTab") {
        chrome.tabs.update(sender.tab.id, {muted: !sender.tab.mutedInfo.muted})
    }

    else if (message.action === "muteAllTabs") { // Toggles mute for all tabs
        
        chrome.tabs.query({currentWindow: true}, async (tab)=>{
            if (await checkAllMuted()) { // If all tabs are muted or unmuted it then toggles mute for all tabs
                for (let i = 0; i < tab.length; i++) {
                    chrome.tabs.update(tab[i].id, {muted: !tab[i].mutedInfo.muted})
                }
            }

            else if (sender.tab.mutedInfo.muted === true)  { // Checks if current tab is muted, if so unmutes all tabs
                for (let i = 0; i < tab.length; i++) {
                    if (!tab[i].mutedInfo.muted) { // Checks if current tab in loop is unmuted, if so it mutes
                        chrome.tabs.update(tab[i].id, {muted: true})
                    }
                }
                }
            else {
                for (let i = 0; i < tab.length; i++) { // Checks if current tab is unmuted, if so unmutes all tabs
                    if (tab[i].mutedInfo.muted) { // Checks if current tab in loop is muted, if so it unmutes
                        chrome.tabs.update(tab[i].id, {muted: false})
                    }
                }
            }
        })
        }

    else if (message.action === "muteAllTabsExceptCurr") { // Mutes all tabs except the one currentley running
        chrome.tabs.query({currentWindow: true}, (tab)=> {
            for (let i = 0; i < tab.length; i++) {
                if (!(sender.tab.id === tab[i].id)) { // Checks if tab in loop is current tab
                    if (!(tab[i].mutedInfo.muted)) {
                        chrome.tabs.update(tab[i].id, {muted: true}) // Toggles mute on tab if qualifys
                    }
                }
            }
        })
    }
    });

async function checkAllMuted() { // Function to check all tabs, if all tabs are muted/unmuted. Uses async/await in order to ensure google responds to request before function moves on
    
    let countF = 0;
    let countT = 0;
    let size = 0;

    const bool = await new Promise(resolve => // Creates a promise to allow the function to finish before moving on all while waiting for googles response
          chrome.tabs.query({currentWindow: true}, (tab) =>{

            size = tab.length;
            for (let i = 0; i < tab.length; i++) { // Checks if all tabs are the same
             if (tab[i].mutedInfo.muted) {
                 countT++;
               }

               else {
                   countF++;
               }
      }

        if (countF === size || countT === size) { // Resolves the promise to show if all tabs are the same
              resolve(true);
         }

        else {
            resolve(false);
        }
        
     }
     )
    )
    
    return bool;
    
}

