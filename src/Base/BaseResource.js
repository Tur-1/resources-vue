import BaseResourceException from "@/Exceptions/BaseResourceException";

class BaseResource
{
    /**
     * The title of the page.
     * @type {string}
     */
    title;

    /**
    * Enable or disable simple pagination. 
    * @type {Boolean}
    */
    simplePagination = true;

    /**
     * The query key used for pagination in URL parameters.
     * @type {string}
     */
    paginationQueryKey = 'page';

    /**
     * The title for the resource
     * @type {string}
     */
    constructor()
    {
        this.title = this.constructor.name.replace(/([a-z])([A-Z])/g, "$1 $2");
    }

    /**
     * Get the paginated data for the resource.
     * The returned Promise must resolve with an object containing `data` and an optional `pagination` object.
     * @throws {BaseResourceException}
     * @returns {Promise<{data: any, pagination: any}>}
     */
    data()
    {
        throw BaseResourceException.missingDataMethod(this.constructor.name);
    }

    /**
     * Get the fields for the resource.
     * @throws {BaseResourceException}
     * @returns {Field[]}
     */
    fields()
    {
        throw BaseResourceException.missingFieldsMethod(this.constructor.name);
    }

    /**
     * Get the pages for the resource.
     * @returns {Page[]}
     */
    pages()
    {
        return [];
    }

    /**
     * Get the filters for the resource.
     * @returns {Filter[]}
     */
    filters()
    {
        return [];
    }

    /**
     * Get the actions for the resource.
     * @returns {Action[]}
     */
    actions()
    {
        return [];
    }

    /**
     * Get the search options for the resource.
     * @returns {Object}
     */
    searchOptions()
    {
        return {
            searchable: true,
            placeholder: "search",
            queryStringKey: "search",
        };
    }
}

export default BaseResource;
