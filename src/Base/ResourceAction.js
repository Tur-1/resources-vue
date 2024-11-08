import ResourceActionException from "@/Exceptions/ResourceActionException";
import useResourceNotification from "@/components/ResourceNotification/useResourceNotification";

class ResourceAction
{

  routeDetails = undefined;
 
  label = undefined;
 
  icon = undefined;

 
  class = undefined;

 
  requiresConfirmation = false;
 
  isDeleteAction = false;
 

  async make(record)
  { 
    
    if (this.getRoute(record) == undefined)
    {
      useResourceNotification.error(
        `You must implement ' make ' method in the action: ${this.constructor.name}`
      );

      setTimeout(() => {
        throw ResourceActionException.missingMakeMethod(this.constructor.name);
      }, 0);
      
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
