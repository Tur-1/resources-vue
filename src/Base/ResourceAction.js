import ResourceActionException from "@/Exceptions/ResourceActionException";


class ResourceAction {
  /**
   * The label of the action.
   * @type {string}
   */
  label = undefined;

  /**
   * The icon of the action.
   * @type {string}
   */
  icon = undefined;

  /**
   * The CSS class for the action button.
   * @type {string}
   */
  class = undefined;

  /**
   * Whether the action requires confirmation.
   * @type {boolean}
   */
  isConfirmAction = false;

  /**
   * Handle the action.
   * @throws {ResourceActionException} If not implemented.
   */
  async handle() {
    throw ResourceActionException.missingHandleMethod(this.constructor.name);
  }
}

export default ResourceAction;
