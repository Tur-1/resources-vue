import { ResourceFilter } from '@tur1/resources-vue'

class Filter extends ResourceFilter {
  /**
   * The label of the filter (optional).
   * @type {string}
   */
  label = 'Filter';

  /**
   * The type of the filter.
   * @type {string}
   */
  type = ''; 

  /**
   * Handle the filter logic
   */
  handle() {
    // Implement the filter logic here when the value selected
  }

  /**
   * Get the options for the filter if type is 'select'. 
   */
   options() {}
}

export default Filter;
