const toggleTableOfContentsHidden = function() {
    var textTOC = document.getElementById("text-table-of-contents")
    if (textTOC != null && window.getComputedStyle(textTOC).display != null) {
        textTOC.style.display = window.getComputedStyle(textTOC).display =="none" ? "inline" : "none"
    }
}

const linkifyTableOfContents = function() {
    var heading = document.querySelector("#table-of-contents h2")
    if (heading != null) {
        heading.innerHTML = '<a href="javascript:toggleTableOfContentsHidden()">Table of Contents</a>'
    }
}

const orgDateToHumanDate = function() {
    let timestamps = document.querySelectorAll(".timestamp")
    let options: any = { weekday: "short", year: 'numeric', month: 'short', day: 'numeric' }

    for (let timestamp of timestamps) {
        timestamp.innerHTML = new Date(timestamp.innerHTML.substring(1,11)).toLocaleDateString(undefined, options)
    }
}

const globalOnLoad = function() {
    linkifyTableOfContents()
    orgDateToHumanDate()
}
