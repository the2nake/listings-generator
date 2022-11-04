function fieldEditCallback(e) {
    e = e || window.event;
    /** @type HTMLElement */
    e.target;
    if (e.target.querySelector("div") != null && e.target.querySelector("div").classList.contains("temp-hover")) {
        return;
    }

    if (e.target.getElementsByTagName("div").length == 0) {
        var hoverInputContainer = document.createElement("div");
        var hoverInput = document.createElement("input");

        hoverInput.value = e.target.innerText;
        hoverInput.classList.add("temp-hover");
        hoverInputContainer.appendChild(hoverInput);
        hoverInputContainer.classList.add("hover-input-container");
        hoverInputContainer.classList.add("temp-hover");
        
        ///** @type DOMRect */
        var rect = e.target.getBoundingClientRect();
        //hoverInputContainer.style.top = (e.target.scrollTop + rect.top + rect.height / 2 + 6) + "px";
        //hoverInputContainer.style.left = rect.left + "px";
        hoverInput.style.width = rect.width + "px";

        e.target.appendChild(hoverInputContainer);

        e.target.onkeydown = function (event) {
            e = e || window.event;

            var inputEl = e.target.getElementsByTagName("input")[0];
            if (event.keyCode == 13 && inputEl.value != "") {
                // this already deletes the input box
                e.target.innerText = inputEl.value;
            }
        }
    }
}

function linkEditCallback(e) {
    e = e || window.event;
    e.preventDefault();
    /** @type HTMLElement */
    let target = e.target;

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
        let target = e.target.parentElement;
        let inputtedName = target.children[0].value;
        let inputtedLink = target.children[1].value;
        if (e.keyCode == 13 && inputtedName != "" && inputtedLink != "") {
            /** @type HTMLElement */
            let linkEl = target.parentElement.getElementsByTagName("a")[0];
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
    let target = e.target;

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
    let target = e.target;

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

function initializeEditor(filestring) {
    var previewEl = document.getElementById("codePreview");
    previewEl.innerHTML = filestring;
    let listingTableEls = previewEl.querySelectorAll("table.table tbody");
    var listingRowEls = listingTableEls[listingTableEls.length - 1].getElementsByTagName("tr");
    for (var i = 0; i < listingRowEls.length; i++) {
        var currentRowEls = listingRowEls[i].getElementsByTagName("td");
        for (var j = 0; j < 3; j++) {
            currentRowEls[j].onclick = fieldEditCallback;
            currentRowEls[j].classList.add("valid-target");
        }
        currentRowEls[3].getElementsByTagName("a")[0].onclick = linkEditCallback;
        currentRowEls[3].getElementsByTagName("a")[0].classList.add("valid-target");
        currentRowEls[4].onclick = raritySelectorCallback;
        currentRowEls[4].classList.add("valid-target");
    }
}

function addRowCallback() {
    var previewEl = document.getElementById("codePreview");

    let listingTableEl = previewEl.querySelectorAll("table.table tbody")
    listingTableEl = listingTableEl[listingTableEl.length - 1];

    var blankTableRow = document.createElement("tr");
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
    for (var j = 0; j < 3; j++) {
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
            })
        } else {
            console.warn(fileName + " may not be a valid html file. Continuing anyways.");
        }
    }
};

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