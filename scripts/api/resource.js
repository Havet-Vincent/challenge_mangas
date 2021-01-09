class LibraryResource  {

    /**
     * @todo Mettre api et resource dans une propriété
     * @param {LibraryApi} api
     * @param {string} resource Comme 'anime', 'manga', 'person', 'search', etc...
     * @see https://jikan.docs.apiary.io/#reference/
     */
    constructor(api, resource) {
        this.api = 'https://api.jikan.moe/v3';
        this.resource = 'anime';
        // this.api = api;
        // this.resource = resource;
    }

    /**
     * @todo Utiliser la méthode fetch de l'api. Construire resource_url avec les propriétés resource & query
     * @param {string} query => peut être par exemple '/10087', '/anime?q=FateZero'
     * @returns {Promise} Promesse qui retourne les données JSON en cas de succès
     */
    loadList = async (query) => {

        try {
            const result = await axios.get(`${this.api}/search/${this.resource}?q=${query}&page=1`);

            //console.log(result.data.results);
           
            return result.data.results;

        } catch(error) {console.log(error)};
    } 
}