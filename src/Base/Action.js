export default function Action() {
  return {
    /**
     * The label of the action.
     * @type {string}
     */
    label: undefined,

    /**
     * The icon of the action.
     * @type {string}
     */
    icon: undefined,

    /**
     * The CSS class for the action button.
     * @type {string}
     */
    class: undefined,

    /**
     * Whether the action requires confirmation.
     * @type {boolean}
     */
    confirmAction: false,

    routeDetails: { name: undefined, param: undefined },
    /**
     * Whether the action requires delete.
     * @type {boolean}
     */
    deleteAction: false,

    /**
     * The callback function for the action.
     * @type {Function}
     */
    callback: undefined,

    /**
     * Sets the callback function to be executed when the action is triggered.
     * @param {Function} callback 
     * @returns {this}
     */
    make(callback) {
      this.callback = callback;
      return this;
    },

    /**
     * Set the route for the action. 
     * @param {{ name: string, param: string }} route
     * @returns {this} 
     */
    route({ name, param }) {

      this.routeDetails = { name, param };
      return this;
    },

    getRoute() {
      return this.routeDetails;
    },

    /**
     * Sets the icon for the action.
     * @param {string} icon - The icon class or name to be set.
     * @returns {this}
     */
    icon(icon) {
      this.icon = icon;
      return this;
    },

    /**
     * Sets the CSS class for the action button.
     * @param {string} className 
     * @returns {this} 
     */
    class(className) {
      this.class = className;
      return this;
    },

    /**
     * Specifies whether the action requires confirmation.
     * @param {boolean} value
     * @returns {this}
     */
    requiresConfirmation(value = false) {
      this.confirmAction = value;
      return this;
    },

    /**
     * Specifies whether the action is a delete action.
     * @param {boolean} isDeleteAction
     * @returns {this} 
     */
    deleteAction(isDeleteAction = false) {
      this.deleteAction = isDeleteAction;
      return this;
    },

    /**
     * Sets the label for the action.
     * @param {string} label - The label action.
     * @returns {this} 
     */
    label(label) {
      this.label = label;
      return this;
    },

    /**
     * Executes the callback function for the action.
     * @param {any} item - The item to be passed to the callback function.
     */
    handle(item) {
      if (this.callback) {
        this.callback(item);
      }
    },
  };
}
