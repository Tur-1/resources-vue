import BaseResourceException from "./../Exceptions/BaseResourceException";

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
   * @default 'true'
   */
  simplePagination = true;

  /**
   * The display style for the layout.
   * Can be 'grid' or 'table'.
   *
   * @type {string}
   * @default 'table'
   */
  display = "table";

  /**
   * The query key used for pagination in URL parameters.
   * @type {string}
   * @default 'page'
   */
  paginationQueryKey = "page";

  /**
   * Searchable status of the resource.
   * @type {boolean}
   */
  searchable = true;

  /**
   * Placeholder for the search input.
   * @type {string}
   */
  searchPlaceholder = "search";
  /**
   * The title for the resource
   * @type {string}
   */
  constructor()
  {
    this.title = this.constructor.name.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  /**
   * Get the data for the resource.
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
   * Get the header actions for the resource.
   * @returns {Page[]}
   */
  headerActions()
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
 * Get the bulk actions for the resource.
 * @returns {ActionInstance[]} 
 */
  bulkActions()
  {
    return [];
  }
}

export default BaseResource;
