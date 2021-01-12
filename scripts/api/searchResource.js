class SearchResource {

    
    constructor(api, resource) {
        this.api = api;
        this.resource = resource;
    }
    /**
     * @param {string} name
     * @todo Utiliser l'api de la classe parente pour appeler la méthode fetch
     * @returns {Promise} Promesse qui retourne les données JSON en cas de succès
     */
    byName = async (id) => {

        try {
            const result = await axios.get(`${this.api}/${this.resource}/${id}`);
           
            return result.data;

        } catch(error) {console.log(error)};
        
    }
}