import useResourceQueryString from "@/composables/useResourceQueryString";
import ResourceFilterException from "@/Exceptions/ResourceFilterException";
import { toSnakeCase } from "@/helpers";
import { ref } from "vue";
import useResourceNotification from "@/components/ResourceNotification/useResourceNotification"; 

/**
 * @typedef {Object} FilterOptions
 * @property {Array<any>} data The array of filter options.
 * @property {string|null} [label] Optional label key for the options.
 * @property {string|null} [value] Optional value key for the options.
 */
class ResourceFilter {
  /**
   * The label of the filter (optional).
   * @type {string}
   */
  label;

  /**
   * The type of the filter, e.g., 'select', 'text'.
   * Must be implemented
   * @type {string}
   */
  type;

  /**
   * The selected value for the filter
   * @type {any}
   */
  selectedValue = ref('');

  constructor() {
    const queryString = useResourceQueryString();
    this.selectedValue.value = queryString.get(this.queryKey());
  }

  /**
   * Get the query key used for this filter, based on the class name.
   * @returns {string}
   */
  queryKey() {
    return toSnakeCase(this.constructor.name);
  }

  /**
   * Validate and get the type of the filter.
   * @returns {string}
   */
  getType() {
    if (!this.type) {
      useResourceNotification.error(`The 'type' property must be implemented in the  ${this.constructor.name}`);
      throw ResourceFilterException.missingType(this.constructor.name);
    }
    return this.type;
  }

  /**
   * Handle the filter logic
   */
  handle() {
 
  }

  /**
   * Get the options for the filter if type is 'select'. 
   * @throws {Error} If not implemented when type is 'select'.
   * @returns {FilterOptions} 
   */
   options() {
    if (this.type === 'select') {
      useResourceNotification.error(`You must implement the options method in the Filter: ${this.constructor.name}`);

      throw new Error(`You must implement the options method in the Filter: ${this.constructor.name}`);
    }
    return {};
  }
 
}

export default ResourceFilter;
