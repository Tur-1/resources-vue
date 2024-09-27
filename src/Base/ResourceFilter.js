import useResourceQueryString from "@/composables/useResourceQueryString";
import ResourceFilterException from "@/Exceptions/ResourceFilterException";
import { toSnakeCase } from "@/helpers";
import { ref } from "vue";

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
    this.selectedValue = ref(queryString.get(this.queryKey()));
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
   * Throws an exception if the type is missing.
   * @returns {string} The filter type.
   */
  getType() {
    if (!this.type) {
      throw ResourceFilterException.missingType(this.constructor.name);
    }
    return this.type;
  }

  /**
   * Handle the filter logic. Should be implemented in subclasses.
   */
  handle() {
    // To be implemented
  }

  /**
   * Get the options for the filter if type is 'select'. 
   * This method should be overridden in subclasses to provide options for the filter.
   * @throws {Error} If not implemented in subclass when type is 'select'.
   * @returns {Promise<{ data: any[] }>} Filter options for select type filters.
   */
  async options() {
    if (this.type === 'select') {
      throw new Error(`You must implement the options method in the Filter: ${this.constructor.name}`);
    }
    return { data: [] };
  }

  /**
   * Converts data to options if label and value are provided.
   * If no label and value keys are provided, it treats data as an array of strings.
   * @returns {Promise<{ label: any, value: any }[]>} Transformed options for select type filters.
   */
  async getOptions() {
    if (this.type === 'select') {
      const options = await this.options();

      if (!options.label || !options.value) {
        return options.data.map((item) => ({
          label: item,
          value: item
        }));
      }

      
      return options.data.map((item) => ({
        label: item[options.label],
        value: item[options.value]
      }));
    }

    return [];
  }
}

export default ResourceFilter;
