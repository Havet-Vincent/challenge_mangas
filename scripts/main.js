/**
 * @todo Point d'entrée pour faire vos exercices...
 * @author Havet Vincent
 * @version 1.0.0
 */


function init() {

    const api = 'https://api.jikan.moe/v3';
    const resource = 'anime';

    const searchLoad = new LibraryApi(api, resource);
    const searchList= new LibraryResource(api, resource);
    const searchResource = new SearchResource(api, resource);

    //document.querySelector("#modal-detail-anime").innerHTML = "";

    
    // constantes on selector
    const formControl = document.querySelector(".form-control"),
          dropdownMenu = document.querySelector(".dropdown-menu"),
          rowCard = document.querySelector(".row"),
          buttonClose = document.querySelector(".close"),
          buttonModal = document.querySelector(".button-modal");



    // display modal
    const showModal = (item) => {
        // document.querySelector(".modal").textContent = "";
        //    document.querySelector(".modal-title").href = "";

        document.querySelector(".modal-title").textContent = `🔥 ${item.title}`;
        let trailer = item.trailer_url;
        console.log("video : ", trailer);
        trailer !== null ? document.querySelector(".modal-video").href = `${item.trailer_url}` : document.querySelector(".modal-video").href = "";

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


    // display results of select in search bar
    const displayResultStrings = (searchStrings) => {
        const htmlString = searchStrings.map((searchString) => {
            return `
                    <div class="col-sm-6 col-md-4 col-xl-2">
                        <div class="card mb-4 box-shadow">
                            <div class="card-body">
                                <img class="card-img" alt="${searchString.title}" src="${searchString.image_url}">
                                <p class="h6">${searchString.title}<span class="badge badge-info ml-1">${searchString.score}</span></p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary btn-info-button" data-toggle="modal" data-target="#modal-detail-anime" id="${searchString.mal_id}">Info</button>
                                    </div>
                                    <small class="text-muted">${searchString.rated}.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                  `;
        }).join('');
    
        rowCard.innerHTML = htmlString;
        const btn = document.querySelectorAll(".btn-info-button"),
              totalBtn = btn.length;
        // add listener on each result
        for (let i = 0; i < totalBtn; i++) {
            btn[i].addEventListener("click", async (event) => {
                event.preventDefault();
                const searchItem = await searchResource.byName(event.target.id);
                showModal(searchItem);
            });
        }
        
    }

    // display results enter in search bar     
    const displaySearchStrings = (searchStrings) => {
        const htmlString = searchStrings.map((searchString) => {
            return `
                  <a class="dropdown-item" href="javascript:void(0);" id="${searchString.title}">${searchString.title}</a>
                  `;

        }).join('');
        dropdownMenu.innerHTML = htmlString;
        const dropdownItem = document.querySelectorAll(".dropdown-item"),
            totaldropdownItem = dropdownItem.length;

        // add listener on each result
        for (let i = 0; i < totaldropdownItem; i++) {
            dropdownItem[i].addEventListener("click", async (event) => {
                event.preventDefault();
                let searchResults = await searchList.loadList(event.target.id);
                let filteredResults = searchResults.filter((result) => result.title.includes(event.target.id));
                displayResultStrings(filteredResults);
            });
        }
    }     
    
    // listener in search bar      
    formControl.addEventListener("keyup", async (event) => {
        event.preventDefault();
        let searchString = event.target.value;
        if (searchString.length >= 3) {
            let searchResults = await searchLoad.load(searchString);
            // filter on result and transform in lowercase
            let filteredResults = searchResults.filter((result) => result.title.toLowerCase().includes(searchString));
            displaySearchStrings(filteredResults);
        }
    });

    // listener in modal button close
    buttonClose.addEventListener('click', (event) => {
        event.preventDefault();
        let temp = document.querySelector(".td-genre");
        let tdSpan = document.querySelector(".badge-info");
        console.log('tdspan vaut :', tdSpan);
        if(document.querySelector(".badge-info")) {
            while (temp.firstChild) {
                temp.removeChild(temp.firstChild);
            }
        }
    })

    // listener in modal button data-dismiss="modal"
    buttonModal.addEventListener('click', (event) => {
        event.preventDefault();
        let temp2 = document.querySelector(".td-genre");
        if(document.querySelector(".badge-info")) {
            while (temp2.firstChild) {
                temp2.removeChild(temp2.firstChild);
            }
        }
    })
}


window.onload = init