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
    const searchResource = new SearchResource();

    
    // Search Bar
    const formControl = document.querySelector(".form-control"),
          dropdownMenu = document.querySelector(".dropdown-menu"),
          rowCard = document.querySelector(".row");



    // display modal
    const showModal = (item) => {
        document.querySelector("#modal").innerHTML = "";
   
        let temp1 = document.querySelector("#sample")
        let copyHTML = document.importNode(temp1.content, true);
        let trailer = item.trailer_url;

        copyHTML.querySelector(".modal-title").textContent = `🔥 ${item.title}`;
        trailer != null ? copyHTML.querySelector(".modal-video").href = `${item.trailer_url}`  : copyHTML.querySelector(".modal-video").innerHTML = "";;
        copyHTML.querySelector(".td-source").textContent = `${item.source}`;
        copyHTML.querySelector(".td-duration").textContent = `${item.duration}`;
        item.genres.map((itemGenre) => {
             copyHTML.querySelector(".badge-info").textContent +=`${itemGenre.name}`+' ';
         });
        copyHTML.querySelector(".td-synopsis").textContent = `${item.synopsis}`;
        document.querySelector("#modal").appendChild(copyHTML);
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
                                        <!-- <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#modal-detail-anime">Info</button> -->
                                        <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#modal-detail-anime" id="${searchString.mal_id}">Info</button>
                                    </div>
                                    <small class="text-muted">${searchString.rated}.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                  `;
        }).join('');
    
        rowCard.innerHTML = htmlString;
        const btn = document.querySelectorAll(".btn"),
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

}


window.onload = init