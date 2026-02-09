document.addEventListener("DOMContentLoaded", function() {
const togMuteButton = document.getElementById("recordButton");
const togMuteAllButton = document.getElementById("recordButtonAll");
const togMuteAllExCurrButton = document.getElementById("recordButtonAllExceptCurr");
const togMuteLabel = document.getElementById("toggleMute");
const togMuteAllLabel = document.getElementById("toggleMuteAll");
const togMuteAllExCurrLabel = document.getElementById("toggleMuteAllExceptCurr");

togMuteButton.addEventListener("click", () => recordShortcut(togMuteLabel, "togMuteLabel"));
togMuteAllButton.addEventListener("click", () => recordShortcut(togMuteAllLabel, "togMuteAllLabel"));
togMuteAllExCurrButton.addEventListener("click", () => recordShortcut(togMuteAllExCurrLabel, "togMuteAllExCurrLabel"));

stopInputHighlighting();
});

const pressed = new Set();
const shortcut = new Set();

function recordShortcut(place, name) {
    var original = place.placeholder;
    place.placeholder = "Recording";
    document.addEventListener("keydown", (event) => {
        
        if (place.placeholder == "Recording") {
            if (event.metaKey) {
                place.placeholder = "CMD";
            }

            else if (event.ctrlKey) {
                place.placeholder = "Ctrl";
            }

            else {
                return;
            }
        }

        else if (event.repeat || pressed.has(event.code)) {
            return;
        }
        else {
        place.placeholder = place.placeholder + " + " + event.key.toUpperCase();
    }
        
        pressed.add(event.code);
        shortcut.add(event.key);
    })

    document.addEventListener("keyup", (event) => {
        pressed.delete(event.code);

        if (pressed.has(event.code) == false) {
            place.placeholder = original;
            pressed.clear();
        }

        if (pressed.size === 0) {
            place.placeholder = original;
            document.removeEventListener('keyup', this);
        }

        chrome.runtime.sendMessage({
            action:"saveShortcut",
            
        })
    })
}

function stopInputHighlighting(selector = 'input[type="text"], textarea, button') {
  document.querySelectorAll(selector).forEach(el => {
    // prevent mouse/touch from moving focus / showing selection
    el.addEventListener('mousedown', e => e.preventDefault());
  });
}

// call once DOM is ready
document.addEventListener('DOMContentLoaded', () => stopInputHighlighting());

window.addEventListener("unload", () => {
    togMuteButton.placeholder = "Key Shortcut";
    togMuteAllButton.placeholder = "Key Shortcut";
    togMuteAllExCurrButton.placeholder = "Key Shortcut";

    document.removeEventListener("keydown", recordShortcut);
    document.removeEventListener("keyup", recordShortcut);
})
