function fieldEditCallback(e) {
    e = e || window.event;

    if (e.target.getElementsByTagName("div").length == 0) {
        var hoverInputContainer = document.createElement("div");
        var hoverInput = document.createElement("input");

        hoverInput.value = e.target.innerText;
        hoverInput.classList.add("temp-hover");
        hoverInputContainer.appendChild(hoverInput);
        hoverInputContainer.classList.add("hover-input-container");
        hoverInputContainer.classList.add("temp-hover");

        var rect = e.target.getBoundingClientRect();
        hoverInputContainer.style.top = (rect.top + rect.height / 2 + 6) + "px";
        hoverInputContainer.style.left = rect.left + "px";
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

    var hoverInputContainer = document.createElement("div");
    var hoverInputName = document.createElement("input");
    var hoverInputLink = document.createElement("input");

    hoverInputName.value = target.getElementsByTagName("a")[0].innerText;
    hoverInputLink.value = target.getElementsByTagName("a")[0].href;
    hoverInputName.classList.add("temp-hover");
    hoverInputLink.classList.add("temp-hover");

    var rect = target.getBoundingClientRect();
    hoverInputContainer.style.top = (rect.top + rect.height / 2 + 6) + "px";
    hoverInputContainer.style.left = rect.left + "px";
    hoverInputName.style.width = rect.width + "px";
    hoverInputLink.style.width = rect.width * 4 + "px";

    hoverInputContainer.classList.add("hover-input-container");
    hoverInputContainer.classList.add("temp-hover");
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

function raritySelectorCallback(e) {

}

function initializeEditor(filestring) {
    var previewEl = document.getElementById("codePreview");
    previewEl.innerHTML = filestring;
    let listingTableEl = previewEl.querySelectorAll("table.table tbody");
    var listingRowEls = listingTableEl[listingTableEl.length - 1].getElementsByTagName("tr");
    for (var i = 0; i < listingRowEls.length; i++) {
        var currentRowEls = listingRowEls[i].getElementsByTagName("td");
        for (var j = 0; j < 3; j++) {
            currentRowEls[j].onclick = fieldEditCallback;
        }
        currentRowEls[3].getElementsByTagName("a")[0].onclick = linkEditCallback;
        currentRowEls[4].onclick = raritySelectorCallback;
    }
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