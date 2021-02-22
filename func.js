toggleTableOfContentsHidden = function() {
    var textTOC = document.getElementById("text-table-of-contents");
    textTOC.style.display = window.getComputedStyle(textTOC).display === "none" ? "inline" : "none";
}

linkifyTableOfContents = function() {
    var heading = document.querySelector("#table-of-contents h2")
    heading.innerHTML = '<a href="javascript:toggleTableOfContentsHidden()">Table of Contents</a>';
}
