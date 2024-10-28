import ResourceActionException from "@/Exceptions/ResourceActionException";

class ResourceAction
{

  routeDetails = undefined;

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
  requiresConfirmation = false;
  /**
   * Whether the action requires delete.
   * @type {boolean}
   */
  isDeleteAction = false;

  /**
   * Handle the action.
   * @throws {ResourceActionException} If not implemented.
   */
  async make(record)
  {
    if (this.getRoute(record))
    {
      throw ResourceActionException.missingHandleMethod(this.constructor.name);
    }
  }

  async handle(record)
  {
    await this.make(record);
  }
  getRoute(record)
  {
    return this.route(record) ?? undefined;
  };

  route(record)
  {
    return undefined;
  }
  /**
    * Check visibility based on the record.
    * @param {Object} record
    */
  checkVisibility(record)
  { 
    return this.visable(record);
  }

  visable(record)
  {
    return true;
  }

  getClass()
  {
    return this.class
  };
  getLabel()
  {
    return this.label
  };
  getIcon()
  {
    return this.icon
  };
  getConfirmAction()
  {
    return this.requiresConfirmation;
  };
}

export default ResourceAction;
