class LibraryApi {
    
    /**
     * @todo Instancier Axios
     * @param {string} base_url
     * @see https://jikan.docs.apiary.io/#introduction/information
     * @see https://github.com/axios/axios
     */
    constructor(base_url, resource) {
        this.base_url = base_url;
        this.resource = resource;
    }

    /**
     * @todo Utiliser axios pour récupérer les données de la ressources
     * @param {string} resource_url => peut être par exemple '/anime/10087'
     * @returns {Promise} Promesse qui retourne les données JSON en cas de succès
     * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
     */
    load = async (resource_url) => {

        try {
            const result = await axios.get(`${this.base_url}/search/anime?q=${resource_url}&page=1`);
           
            return result.data.results;

        } catch(error) {console.log(error)};
    }    
}