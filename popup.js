var togMuteButton = document.getElementById("recordButton");
var togMuteAllButton = document.getElementById("recordButtonAll");
var togMuteAllExCurrButton = document.getElementById("recordButtonAllExceptCurr");
var togMuteLabel = document.getElementById("toggleMute");

togMuteButton.addEventListener("click", recordShortcut(togMuteLabel));

function recordShortcut(place) {
    var original = place.placeholder;
    place.placeholder = "Recording";
    document.addEventListener("keydown", (event) => {
        if (event.key === "b" && event.metaKey) {
            place.placeholder = original;
        }

    })
}
