/**
 * @todo application pour rechercher des films animés japonais.
 * @author Havet Vincent
 * @version 1.0.0
 */


function init() {

    const api = 'https://api.jikan.moe/v3';
    const resource = 'anime';

    const searchLoad = new LibraryApi(api, resource);
    const searchList= new LibraryResource(api, resource);
    const searchResource = new SearchResource(api, resource);

    
    // constantes on selector
    const formControl = document.querySelector(".form-control"),
          dropdownMenu = document.querySelector(".dropdown-menu"),
          rowCard = document.querySelector(".row"),
          buttonClose = document.querySelector(".close"),
          buttonModal = document.querySelector(".button-modal");


    // function display results of select in search bar 
    const displayResultStrings = (searchStrings) => {
        const htmlString = searchStrings.map((searchString) => {
            return `
                            <div class="col-sm-6 col-md-4 col-xl-2">
                                <div class="card border-dark mb-4 box-shadow">
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
                toggleClassDoneAtRow();
                toggleClassDoneAtLoader();

                const searchItem = await searchResource.byName(event.target.id);

                toggleClassDoneAtLoader();
                toggleClassDoneAtRow();
                showModal(searchItem);
            });
        }
    }

    // function show results enter in search bar
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
                toggleClassDoneAtRow()
                toggleClassDoneAtLoader();

                let searchResults = await searchList.loadList(event.target.id);
                let filteredResults = searchResults.filter((result) => result.title.includes(event.target.id));

                toggleClassDoneAtLoader();
                toggleClassDoneAtRow();
                displayResultStrings(filteredResults);
            });
        }
    }



    // listener in search bar      
    formControl.addEventListener("keyup", async (event) => {
        event.preventDefault();
        let searchString = event.target.value;
        if (searchString.length >= 3) {
            toggleClassDoneAtLoader();
            let searchResults = await searchLoad.load(searchString);
            // filter on result and transform in lowercase
            let filteredResults = searchResults.filter((result) => result.title.toLowerCase().includes(searchString));
            toggleClassDoneAtLoader();
            displaySearchStrings(filteredResults);
        }
    });

    // listener in modal button close
    buttonClose.addEventListener('click', (event) => {
        event.preventDefault();
        removeFirstChild();
        addClassDoneAtModal();
    })

    // listener in modal button data-dismiss="modal"
    buttonModal.addEventListener('click', (event) => {
        event.preventDefault();
        removeFirstChild();
        toggleClassDoneAtModal();
    })
}


window.onload = init