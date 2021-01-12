/**
 * @todo function display loader
 * @returns void
 */
function removeClassDoneAtLoader() {
    document.querySelector("#loader").classList.remove("d-none");
}

/**
 * @todo function hidden loader
 * @returns void
 */
function addClassDoneAtLoader() {
    document.querySelector("#loader").classList.add("d-none");
}

/**
 * @todo function display Modal 
 * @returns void
 */
function removeClassDoneAtModal() {
    document.querySelector("#modal-detail-anime").classList.remove("d-none");
}

/**
 * @todo function hidden Modal
 * @returns void
 */
function addClassDoneAtModal() {
    document.querySelector("#modal-detail-anime").classList.add("d-none");
}

/**
* @todo function show modal
* @param {array} 
* @returns void
*/
function showModal(item) {
    removeClassDoneAtModal();
    document.querySelector(".modal-title").textContent = `🔥 ${item.title}`;
    let trailer = item.trailer_url;
    trailer !== null ? document.querySelector(".modal-video").href = `${item.trailer_url}` : document.querySelector(".modal-video").textContent = "";

    document.querySelector(".td-source").textContent = `${item.source}`;
    document.querySelector(".td-duration").textContent = `${item.duration}`;


    item.genres.map((itemGenre) => {
        let tdGenre = document.querySelector(".td-genre");
        let tdSpan = document.createElement("span");
        tdSpan.className = "badge badge-info ml-1";
        tdSpan.textContent = "";
        tdSpan.textContent = `${itemGenre.name}`;
        tdGenre.append(tdSpan);
    });

    document.querySelector(".td-synopsis").textContent = `${item.synopsis}`;
}   

/**
* @todo function remove firstchild 
* @returns void
*/
function removeFirstChild() {
    let temp = document.querySelector(".td-genre");
    if(document.querySelector(".badge-info")) {
        while (temp.firstChild) {
            temp.removeChild(temp.firstChild);
        }
    }
    document.querySelector(".modal-video").textContent= "🎥 Trailer";
    document.querySelector(".modal-video").href= "";
}



