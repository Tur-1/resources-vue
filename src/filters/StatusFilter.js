import { ResourceFilter } from '@tur-resources/vue'
import { ref } from "vue";

class StatusFilter extends ResourceFilter {
  /**
   * The label of the filter (optional).
   * @type {string}
   */
  label = 'StatusFilter';

  /**
   * The type of the filter.
   * @type {string}
   */
  type = ''; 

  /**
   * The selected value for the filter
   * @type {any}
   */
  selectedValue = ref('');

  /**
   * Get the query key 
   * @returns {string}
   */
  queryKey() {}

  /**
   * Handle the filter logic
   */
  handle() {
    // Implement the filter logic here when the value selected
  }

  /**
   * Get the options for the filter if type is 'select'.
   * @throws {Error} If not implemented when type is 'select'.
   */
   options() {}
}

export default StatusFilter;
