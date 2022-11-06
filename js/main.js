function IDFieldEditCallback(e) {
    e = e || window.event;
    /** @type HTMLElement */

    var target = e.target;
    while (!target.classList.contains("valid-target")) {
        target = target.parentElement;
        if (target.tagName == "BODY") {
            return;
        }
    }

    if (target.querySelector("div") != null && target.querySelector("div").classList.contains("temp-hover")) {
        return;
    }

    if (target.getElementsByTagName("div").length == 0) {
        var hoverInputContainer = document.createElement("div");
        var hoverInput = document.createElement("input");

        hoverInput.value = target.innerText;
        hoverInput.classList.add("temp-hover");
        hoverInputContainer.appendChild(hoverInput);
        hoverInputContainer.classList.add("hover-input-container");
        hoverInputContainer.classList.add("temp-hover");

        ///** @type DOMRect */
        var rect = target.getBoundingClientRect();
        //hoverInputContainer.style.top = (target.scrollTop + rect.top + rect.height / 2 + 6) + "px";
        //hoverInputContainer.style.left = rect.left + "px";
        hoverInput.style.width = rect.width + "px";

        target.appendChild(hoverInputContainer);

        target.onkeydown = function (e) {
            e = e || window.event;

            var target = e.target;
            while (!target.classList.contains("valid-target")) {
                target = target.parentElement;
                if (target.tagName == "BODY") {
                    return;
                }
            }

            var inputEl = target.getElementsByTagName("input")[0];
            if (e.key == "Enter" && inputEl.value != "") {
                // modifying the relevant id values
                // if there is no div or a element this will fail
                target.parentElement.children[5].querySelector("a").href = "#traits-" + inputEl.value;
                target.parentElement.children[5].querySelector("div.collapse").id = "traits-" + inputEl.value;
                target.parentElement.children[6].querySelector("a").href = "#change-" + inputEl.value;
                target.parentElement.children[6].querySelector("div.collapse").id = "change-" + inputEl.value;
                target.parentElement.children[7].querySelector("a").href = "#trade-" + inputEl.value;
                target.parentElement.children[7].querySelector("div.collapse").id = "trade-" + inputEl.value;

                // this already deletes the input box
                target.innerText = inputEl.value;
            }
        }
    }
}

function makeFieldEditInput(e, inputBoxLengthMultiplier = 1) {
    /** @type HTMLElement */ // declare for code autocomplete

    var target = e.target;
    while (target.tagName != "LI" && !target.classList.contains("valid-target")) {
        target = target.parentElement;
        if (target.tagName == "BODY") {
            return;
        }
    }

    if (target.querySelector("div") != null && target.querySelector("div").classList.contains("temp-hover")) {
        return; // if there is already an edit field, don't make another
    }

    var hoverInputContainer = document.createElement("div");
    var hoverInput = document.createElement("input");

    hoverInput.value = target.innerText;
    hoverInput.classList.add("temp-hover");
    hoverInputContainer.appendChild(hoverInput);
    hoverInputContainer.classList.add("hover-input-container");
    hoverInputContainer.classList.add("temp-hover");

    ///** @type DOMRect */
    var rect = target.getBoundingClientRect();
    //hoverInputContainer.style.top = (e.target.scrollTop + rect.top + rect.height / 2 + 6) + "px";
    //hoverInputContainer.style.left = rect.left + "px";
    hoverInput.style.width = rect.width * inputBoxLengthMultiplier + "px";

    target.appendChild(hoverInputContainer);

    target.onkeydown = function (e) {
        e = e || window.event;
        while (target.tagName != "LI" && !target.classList.contains("valid-target")) {
            target = target.parentElement;
            if (target.tagName == "BODY") {
                return;
            }
        }
        var inputEl = target.getElementsByTagName("input")[0];
        if (e.key == "Enter" && inputEl.value != "") {
            // this already deletes the input box
            target.innerText = inputEl.value;
        }
    }
}

function fieldEditCallback(e) {
    makeFieldEditInput(e, 1);
}

/** This is just a slightly different fieldEditCallback function */
function longFieldEditCallback(e) {
    makeFieldEditInput(e, 2.5);
}

function linkEditCallback(e) {
    e = e || window.event;
    e.preventDefault();
    /** @type HTMLElement */
    var target = e.target;

    if (target.nodeName = "A") {
        target = target.parentElement;
    }

    if (target.querySelector("div") != null && target.querySelector("div").classList.contains("temp-hover")) {
        return;
    }

    var hoverInputContainer = document.createElement("div");
    hoverInputContainer.classList.add("hover-input-container");
    hoverInputContainer.classList.add("temp-hover");

    var hoverInputName = document.createElement("input");
    var hoverInputLink = document.createElement("input");

    hoverInputName.value = target.getElementsByTagName("a")[0].innerText;
    hoverInputLink.value = target.getElementsByTagName("a")[0].href;
    hoverInputName.classList.add("temp-hover");
    hoverInputLink.classList.add("temp-hover");

    var rect = target.getBoundingClientRect();
    //hoverInputContainer.style.top = (target.scrollTop + rect.top + rect.height / 2 + 6) + "px";
    //hoverInputContainer.style.left = rect.left + "px";
    hoverInputName.style.width = rect.width + "px";
    hoverInputLink.style.width = rect.width * 4 + "px";

    hoverInputContainer.appendChild(hoverInputName);
    hoverInputContainer.appendChild(hoverInputLink);

    target.appendChild(hoverInputContainer);

    var linkEditSubmitCallback = function (e) {
        e = e || window.event;
        var target = e.target.parentElement;
        var inputtedName = target.children[0].value;
        var inputtedLink = target.children[1].value;
        if (e.keyCode == 13 && inputtedName != "" && inputtedLink != "") {
            /** @type HTMLElement */
            var linkEl = target.parentElement.getElementsByTagName("a")[0];
            linkEl.href = inputtedLink;
            linkEl.innerHTML = `<i class="fas fa-heart"></i>` + inputtedName;
            target.parentElement.removeChild(target);
        }
    };
    hoverInputName.onkeydown = linkEditSubmitCallback;
    hoverInputLink.onkeydown = linkEditSubmitCallback;
}

function raritySelectedCallback(e) {
    e = e || window.event;
    e.preventDefault();
    /** @type HTMLElement */
    var target = e.target;

    while (!target.classList.contains("btn")) {
        target = target.parentElement;
    }

    var clone = target.cloneNode(true);

    while (!target.classList.contains("valid-target")) {
        target = target.parentElement;
    }

    target.innerHTML = "";
    target.appendChild(clone);
}

function raritySelectorCallback(e) {
    e = e || window.event;
    e.preventDefault();
    /** @type HTMLElement */
    var target = e.target;

    while (target != null) {
        if (target.classList.contains("valid-target")) {
            break;
        } else {
            target = target.parentElement;
        }
    }

    if (target == null) {
        return;
    }

    if (target.querySelector("div") != null && target.querySelector("div").classList.contains("temp-hover")) {
        // making sure there are no duplicates
        return;
    }

    var hoverInputContainer = document.createElement("div");
    hoverInputContainer.classList.add("hover-input-container");
    hoverInputContainer.classList.add("temp-hover");
    hoverInputContainer.style.height = "24px";
    hoverInputContainer.style.paddingLeft = "8px";
    hoverInputContainer.style.paddingRight = "8px";

    hoverInputContainer.innerHTML = `
    <a class="btn btn-sm bg-info tooltipster" data-toggle="tooltip" title="Common"><i
    class="fas fa-star"></i></a>
<a class="btn btn-sm bg-success tooltipster" data-toggle="tooltip" title="Uncommon"><i
    class="fas fa-star"></i><i class="fas fa-star"></i></a>
<a class="btn btn-sm bg-secondary tooltipster" data-toggle="tooltip" title="Rare"><i
    class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></a>
<a class="btn btn-sm bg-danger tooltipster" data-toggle="tooltip" title="Legendary"><i
    class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
    class="fas fa-star"></i></a>
<a class="btn btn-sm bg-warning tooltipster" data-toggle="tooltip" title="Mythical"><i
    class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
    class="fas fa-star"></i><i class="fas fa-star"></i></a>
<a class="btn btn-sm bg-light tooltipster" data-toggle="tooltip" title="Exclusive"><i
    class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
    class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></a>
    `;

    var hoverChildren = hoverInputContainer.children;

    for (let i = 0; i < hoverChildren.length; i++) {
        hoverChildren[i].onclick = raritySelectedCallback;
    }

    target.appendChild(hoverInputContainer);
}

function traitEditCallback(e) {
    e = e || window.event;

    var target = e.target;
}

function addTraitCallback(e) {
    e = e || window.event;

    deleteRowMode = false;
    deleteEntryMode = false;
    document.getElementById('removeRowToggleButton').classList.add("btn-inactive");
    document.getElementById('removeEntryToggleButton').classList.add("btn-inactive");

    var target = e.target;
    while (target.tagName != "LI") {
        target = target.parentElement;
        if (target.tagName == "BODY") {
            console.error("Click target not contained within an <li> tag. Cannot insert new trait.");
            return;
        }
    }
    var newTraitEl = document.createElement("li");
    newTraitEl.classList.add("valid-deleteentry-target");
    newTraitEl.innerHTML = `<a class="btn btn-sm bg-info tooltipster" data-toggle="tooltip" title="Common">TRAIT</a>`;
    target.parentElement.insertBefore(newTraitEl, target);
}

function addEntryCallback(e) {
    e = e || window.event;

    var target = e.target;

    deleteRowMode = false;
    deleteEntryMode = false;
    document.getElementById('removeRowToggleButton').classList.add("btn-inactive");
    document.getElementById('removeEntryToggleButton').classList.add("btn-inactive");

    while (target.tagName != "LI") {
        target = target.parentElement;
        if (target.tagName == "BODY") {
            console.error("Click target not contained within an <li> tag. Cannot insert new trait.");
            return;
        }
    }
    var newEntryEl = document.createElement("li");
    newEntryEl.classList.add("valid-deleteentry-target");
    newEntryEl.innerHTML = `log entry`;
    newEntryEl.onclick = longFieldEditCallback;
    target.parentElement.insertBefore(newEntryEl, target);
}

function initializeEditor(filestring) {
    var previewEl = document.getElementById("codePreview");
    previewEl.innerHTML = filestring;
    var listingTableEls = previewEl.querySelectorAll("table.table tbody");
    var listingRowEls = listingTableEls[listingTableEls.length - 1].getElementsByTagName("tr");
    for (let i = 0; i < listingRowEls.length; i++) {
        listingRowEls[i].classList.add("valid-deleterow-target");
        var currentRowEls = listingRowEls[i].getElementsByTagName("td");
        currentRowEls[0].onclick = IDFieldEditCallback;
        currentRowEls[0].classList.add("valid-target");
        for (let j = 1; j < 3; j++) {
            currentRowEls[j].onclick = fieldEditCallback;
            currentRowEls[j].classList.add("valid-target");
        }
        currentRowEls[3].getElementsByTagName("a")[0].onclick = linkEditCallback;
        currentRowEls[3].getElementsByTagName("a")[0].classList.add("valid-target");
        currentRowEls[4].onclick = raritySelectorCallback;
        currentRowEls[4].classList.add("valid-target");

        // make all entries deletable
        var entryEls = listingRowEls[i].querySelectorAll("div.collapse li");
        for (let k = 0; k < entryEls.length; k++) {
            entryEls[k].classList.add("valid-deleteentry-target");
        }

        // put this after so the add buttons aren't marked as deletable
        var traitTDEl = currentRowEls[5];
        if (traitTDEl.querySelector("li") == null) {
            traitTDEl.innerHTML = `<a data-toggle="collapse" href="#traits-${currentRowEls[0].innerText}">View All</a>
            <div class="collapse" id="traits-${currentRowEls[0].innerText}">
                <ul class="list-unstyled">
                    <li><button class="btn-add" onclick="addTraitCallback()"><i class="fas fa-plus"></i></button></li>
                </ul>
            </div>`;
        } else {
            // make all traits editable before making the add button
            var currentRowTraitEls = changeTDEl.querySelectorAll("li");
            for (let j = 0; j < currentRowTraitEls.length; j++) {
                currentRowTraitEls[j].onclick = traitEditCallback;
            }
            // add button
            var addButtonEl = document.createElement("li");
            addButtonEl.innerHTML = `<button class="btn-add" onclick="addTraitCallback()"><i class="fas fa-plus"></i></button>`;
            traitTDEl.querySelector("div.collapse ul").appendChild(addButtonEl);
        }
        var changeTDEl = currentRowEls[6];
        if (changeTDEl.querySelector("li") == null) {
            changeTDEl.innerHTML = `<a data-toggle="collapse" href="#change-${currentRowEls[0].innerText}">View All</a>
            <div class="collapse" id="change-${currentRowEls[0].innerText}">
                <ul class="list-unstyled">
                    <li><button class="btn-add" onclick="addEntryCallback()"><i class="fas fa-plus"></i></button></li>
                </ul>
            </div>`;
        } else {
            // make all entries editable before making the add button
            var currentRowChangeEntryEls = changeTDEl.querySelectorAll("li");
            for (let j = 0; j < currentRowChangeEntryEls.length; j++) {
                currentRowChangeEntryEls[j].onclick = longFieldEditCallback;
            }
            // add button
            var addButtonEl = document.createElement("li");
            addButtonEl.innerHTML = `<button class="btn-add" onclick="addEntryCallback()"><i class="fas fa-plus"></i></button>`;
            changeTDEl.querySelector("div.collapse ul").appendChild(addButtonEl);
        }
        //----------
        var tradeTDEl = currentRowEls[7];
        if (tradeTDEl.querySelector("li") == null) {
            tradeTDEl.innerHTML = `<a data-toggle="collapse" href="#trade-${currentRowEls[0].innerText}">View All</a>
            <div class="collapse" id="trade-${currentRowEls[0].innerText}">
                <ul class="list-unstyled">
                    <li><button class="btn-add" onclick="addEntryCallback()"><i class="fas fa-plus"></i></button></li>
                </ul>
            </div>`;
        } else {
            // make all entries editable before making the add button
            var currentRowTradeEntryEls = tradeTDEl.querySelectorAll("li");
            for (let j = 0; j < currentRowTradeEntryEls.length; j++) {
                currentRowTradeEntryEls[j].onclick = longFieldEditCallback;
            }
            // add button
            var addButtonEl = document.createElement("li");
            addButtonEl.innerHTML = `<button class="btn-add" onclick="addEntryCallback()"><i class="fas fa-plus"></i></button>`;
            tradeTDEl.querySelector("div.collapse ul").appendChild(addButtonEl);
        }
    }
}

function addRowCallback() {

    deleteRowMode = false;
    deleteEntryMode = false;
    document.getElementById('removeRowToggleButton').classList.add("btn-inactive");
    document.getElementById('removeEntryToggleButton').classList.add("btn-inactive");

    var previewEl = document.getElementById("codePreview");

    var listingTableEl = previewEl.querySelectorAll("table.table tbody");
    listingTableEl = listingTableEl[listingTableEl.length - 1];

    var blankTableRow = document.createElement("tr");
    blankTableRow.classList.add("valid-deleterow-target");
    blankTableRow.innerHTML = `<td>00000</td>
    <td style="width: 16.4035%;">@user</td>
    <td style="width: 17.0176%;">@user</td>
    <td><a href="LINK"><i class="fas fa-heart"></i>CHRNAME</a></td>
    <td><a class="btn btn-sm bg-info tooltipster" data-toggle="tooltip" title="Common"><i
                class="fas fa-star"></i></a></td>
    <td>
        <a data-toggle="collapse" href="#traits-00000">View All</a>
        <div class="collapse" id="traits-00000">
            <ul class="list-unstyled">
                <li><a class="btn btn-sm bg-info tooltipster" data-toggle="tooltip" title="Common">TRAIT</a>
                </li>
            </ul>
        </div>
    </td>
    <td>
        <a data-toggle="collapse" href="#change-00000">View All</a>
        <div class="collapse" id="change-00000"><br></div>
    </td>
    <td>
        <a data-toggle="collapse" href="#trade-00000">View All</a>
        <div class="collapse" id="trade-00000">
            <ul class="list-unstyled">
                <li>@user - type</li>
            </ul>
        </div>
    </td>`;
    listingTableEl.appendChild(blankTableRow);

    var currentRowEls = blankTableRow.getElementsByTagName("td");
    for (let j = 0; j < 3; j++) {
        currentRowEls[j].onclick = fieldEditCallback;
        currentRowEls[j].classList.add("valid-target");
    }
    currentRowEls[3].getElementsByTagName("a")[0].onclick = linkEditCallback;
    currentRowEls[3].getElementsByTagName("a")[0].classList.add("valid-target");
    currentRowEls[4].onclick = raritySelectorCallback;
    currentRowEls[4].classList.add("valid-target");
}

/** @type HTMLInputElement */
var UploadFileEl = document.getElementById("codeInput");

UploadFileEl.oninput = function () {
    if (UploadFileEl.files != null) {
        var file = UploadFileEl.files[0];
        var fileName = file.name;
        if (fileName.endsWith(".html")) {
            file.text().then(function (result) {
                initializeEditor(result);
            }, function (error) {
                console.error(`File loading error: ${error}.`);
            });
        } else {
            console.warn(fileName + " may not be a valid html file. Continuing anyways.");
        }
    }
};

var deleteRowMode = false;
var deleteEntryMode = false;

function toggleRemoveRow() {
    if (deleteRowMode) {
        deleteRowMode = false;
        document.getElementById('removeRowToggleButton').classList.add("btn-inactive");
    } else {
        deleteEntryMode = false;
        deleteRowMode = true;
        document.getElementById('removeEntryToggleButton').classList.add("btn-inactive");
        document.getElementById('removeRowToggleButton').classList.remove("btn-inactive");
    }
}

function toggleRemoveEntry() {
    if (deleteEntryMode) {
        deleteEntryMode = false;
        document.getElementById('removeEntryToggleButton').classList.add("btn-inactive");
    } else {
        deleteRowMode = false;
        deleteEntryMode = true;
        document.getElementById('removeRowToggleButton').classList.add("btn-inactive");
        document.getElementById('removeEntryToggleButton').classList.remove("btn-inactive");
    }
}

function attemptDeleteRowCallback(e) {
    if (deleteRowMode) {
        e = e || window.event;

        var target = e.target;
        while (!target.classList.contains("valid-deleterow-target")) {
            if (target.classList.contains("btn-add")) {
                return;
            }
            target = target.parentElement;
            if (target.tagName == "BODY") {
                console.warn("Click was not contained inside a row marked deletable. Add the class \"valid-deleterow-target\" to the relevant <tr> tag to mark the row as deletable.");
                return;
            }
        }

        target.parentElement.removeChild(target);
    }
}

function attemptDeleteEntryCallback(e) {
    if (deleteEntryMode) {
        e = e || window.event;

        var target = e.target;
        while (!target.classList.contains("valid-deleteentry-target")) {
            target = target.parentElement;
            if (target.tagName == "BODY") {
                console.warn("Click was not contained inside a entry marked deletable. Add the class \"valid-deleteentry-target\" to the relevant <li> tag to mark the entry as deletable.");
                return;
            }
        }

        target.parentElement.removeChild(target);
    }
}

window.addEventListener("click", attemptDeleteRowCallback);
window.addEventListener("click", attemptDeleteEntryCallback);

function finaliseAndDownload() {
    // DONE: delete all valid-target, valid-deleterow-target, valid-deleteentry-target class references
    // TODO: delete all the add trait buttons
    // TODO: if there are no entries in the <ul> tag, change the <ul> into a <br/>
    var validTargetEls = document.getElementsByClassName("valid-target");
    var validDeleteRowTargetEls = document.getElementsByClassName("valid-deleterow-target");
    var validDeleteEntryTargetEls = document.getElementsByClassName("valid-deleteentry-target");

    while (0 < validTargetEls.length) validTargetEls[0].classList.remove("valid-target"); // the list shrinks itself as the class is removed (HTMLCollectionOf is live)
    while (0 < validDeleteRowTargetEls.length) validDeleteRowTargetEls[0].classList.remove("valid-deleterow-target");
    while (0 < validDeleteEntryTargetEls.length) validDeleteEntryTargetEls[0].classList.remove("valid-deleteentry-target");
}

document.getElementById("download-code-button").addEventListener("click", finaliseAndDownload);

window.onclick = function (e) {
    //e = e || window.event;
    //if (!e.target.classList.contains("temp-hover") && e.target.querySelectorAll(".temp-hover").length == 0) {
    //    var tempHovers = document.getElementsByClassName("temp-hover");
    //    if (e.target.onclick == null) {
    //        for (let i = 0; i < tempHovers.length; i++) {
    //            tempHovers[i].parentElement.removeChild(tempHovers[i]);
    //        }
    //    } else {
    //        for (let i = 0; i < tempHovers.length; i++) {
    //            if (!e.target.contains(tempHovers[i])) {
    //                tempHovers[i].parentElement.removeChild(tempHovers[i]);
    //            }
    //        }
    //    }
    //}
};