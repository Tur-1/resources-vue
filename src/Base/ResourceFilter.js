import ResourceFilterException from "@/Exceptions/ResourceFilterException";
import { toSnakeCase } from "@/helpers";
import useResourceNotification from "@/components/ResourceNotification/useResourceNotification";

class ResourceFilter {
  label;

  queryString = toSnakeCase(this.constructor.name);

  type = "";

  selectedValue = "";

  getType() {
    if (!this.type) {
      useResourceNotification.error(
        `The 'type' property must be implemented in the  ${this.constructor.name}`
      );
      setTimeout(() => {
        throw ResourceFilterException.missingType(this.constructor.name);
      }, 0);
     
    }
    return this.type;
  }

  /**
   * Handle the filter logic
   */
  handle(value) {}

  options() {
    if (this.type === "select") {
      useResourceNotification.error(
        `You must implement the options method in the Filter: ${this.constructor.name}`
      );

      setTimeout(() => {
        throw ResourceFilterException.missingOptionsMethod(this.constructor.name);
      }, 0);

    }
  }
}

export default ResourceFilter;
