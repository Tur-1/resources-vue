import { BaseResource } from '@tur1/resources-vue'
import DeleteAction from '@/pages/Users/Actions/DeleteAction'
import Filter from '@/pages/Users/Filters/Filter'

class Users extends BaseResource {
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
   * Searchable status of the resource.
   * @type {boolean}
   */
  searchable = true;

  /**
   * Placeholder for the search input.
   * @type {string}
   */
  searchPlaceholder = 'search';

  /**
   * Get the data for the resource.
   */
  data() {
    return {
      data: any,
      pagination: any
    }
  }

  /**
   * Get the fields for the resource.  
   */
  fields() {
    return []
  }

  /**
   * Get the pages for the resource. 
   */
  pages() {
    return {
      show: {
        routeName: 'users.show',
        routeParam: 'id',
        title: 'Show Users',
        label: 'Show',
        icon: 'fa-solid fa-eye',
        class: 'text-primary'
      },
      edit: {
        routeName: 'users.edit',
        routeParam: 'id',
        title: 'Edit Users',
        label: 'Edit',
        icon: 'fa-solid fa-pen-to-square',
        class: 'text-primary'
      },
      create: {
        routeName: 'users.create',
        title: 'create Users',
        label: 'create Users'
      }
    };
  }

  /**
   * Get the filters for the resource. 
   */
  filters() {
    return [new Filter()];
  }

  /**
   * Get the actions for the resource.
   */
  actions() {
    return [new DeleteAction()];
  }

}

export default Users;