"use strict";

const toggleTableOfContentsHidden = function () {
    var textTOC = document.getElementById("text-table-of-contents");
    if (textTOC != null && window.getComputedStyle(textTOC).display != null) {
        textTOC.style.display = window.getComputedStyle(textTOC).display == "none" ? "inline" : "none";
    }
};
const linkifyTableOfContents = function () {
    var heading = document.querySelector("#table-of-contents h2");
    if (heading != null) {
        heading.innerHTML = '<a href="javascript:toggleTableOfContentsHidden()">Table of Contents</a>';
    }
};
const orgDateToHumanDate = function () {
    let timestamps = document.querySelectorAll(".timestamp");
    let options = { weekday: "short", year: 'numeric', month: 'short', day: 'numeric' };
    for (let timestamp of timestamps) {
        timestamp.innerHTML = new Date(timestamp.innerHTML.substring(1, 11)).toLocaleDateString(undefined, options);
    }
};
const linkifyTags = function () {
    let tags = document.querySelectorAll(".tag");
    for (let tagHeading of tags) {
        for (let tag of tagHeading.children) {
            let tagClassName = tag.className;
            tag.onclick = function (e) { filterByTag(tagClassName); };
        }
    }
};

// Contains all the active tags on the page.
let activeTags = [];

// Filter by the provided tag, pass empty string to show all.
const filterByTag = function (filterTag) {
    var _a, _b;
    let articles = document.querySelectorAll(".outline-2");

    console.log(activeTags);
    if (filterTag == "") {
        activeTags = [];
    } else if (activeTags.includes(filterTag)) {
        console.log("Ignoring repeated tag application");
        return;
    } else {
        activeTags.push(filterTag);
    }
    for (let article of articles) {
        if (filterTag == "") {
            article.hidden = false;
            continue;
        }
        let tags = (_a = article.querySelector(".tag")) === null || _a === void 0 ? void 0 : _a.children;
        if (tags == undefined) {
            article.hidden = true;
            continue;
        }
        var shouldKeep = false;
        for (let tag of tags) {
            if (tag.className == filterTag) {
                shouldKeep = true;
                break;
            }
        }
        article.hidden = !shouldKeep;
    }
    let textTOC = document.getElementById("table-of-contents");
    if (!textTOC) {
        console.log("Could not find table of contents element!");
        return;
    }
    if (filterTag == "") {
        textTOC.hidden = false;
        return;
    }
    textTOC.hidden = true;
    var tagFilter = document.createElement("span");
    tagFilter.className = "tag";
    tagFilter.innerHTML = "<span>" + filterTag + " X" + "</span>";
    tagFilter.onclick = function (e) {
        // TODO: Bug when clearing multiple tags, should instead filter on
        // the remaining tags. Would need marking tags specially.
        filterByTag("");
        tagFilter.remove();
    };
    (_b = textTOC.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(tagFilter, textTOC);
};
const globalOnLoad = function () {
    linkifyTableOfContents();
    orgDateToHumanDate();
    linkifyTags();
};
