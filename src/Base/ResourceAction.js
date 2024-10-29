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
 

  async make(record)
  {
    if (this.getRoute(record))
    {
      throw ResourceActionException.missingHandleMethod(this.constructor.name);
    }
  }


  route(record)
  {
    return undefined;
  }
  hidden(record)
  {
    return false;
  }
  isHidden(record)
  { 
    return this.hidden(record);
  }



  async handle(record)
  {
    await this.make(record);
  }
  getRoute(record)
  {
    return this.route(record) ?? undefined;
  };
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
