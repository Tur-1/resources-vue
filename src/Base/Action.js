export default function Action()
{
  return {
 
    labelAction: undefined,

    iconAction: undefined,

    classAction: undefined,

    confirmAction: false,

    routeCallback: undefined,

    isDeleteAction: false,

    callback: undefined,

    isActionHidden: false, 


    make(callback)
    {
      this.callback = callback;
      return this;
    },
 
    route(route)
    {
      if (typeof route !== 'string' && typeof route !== 'object' && typeof route !== 'function')
      {
        throw new Error("The route must be a string, an object, or a function.");
      }

      this.routeCallback = route;
      return this;
    },

    getRoute(record)
    { 
      return typeof this.routeCallback === 'function' ? this.routeCallback(record) : this.routeCallback;
    },
    /**
     * Sets the icon for the action.
     * @param {string} icon 
     * @returns {this}
     */
    icon(icon)
    {
      this.iconAction = icon;
      return this;
    },

    /**
     * Sets the CSS class for the action button.
     * @param {string} className 
     * @returns {this} 
     */
    class(className)
    {
      this.classAction = className;
      return this;
    },

    /**
     * Specifies whether the action requires confirmation.
     * @param {boolean} value
     * @returns {this}
     */
    requiresConfirmation(value = true)
    {
      this.confirmAction = value
      return this;
    },

    /**
     * Specifies whether the action is a delete action.
     * @param {boolean} isDeleteAction
     * @returns {this} 
     */
    deleteAction()
    {
      this.isDeleteAction = true;
      this.classAction = 'text-danger';
      this.labelAction = 'Delete';
      this.iconAction = 'fa-solid fa-trash-can';
      this.confirmAction = 'fa-solid fa-trash-can';
      
      return this;
    },

    /**
     * Sets the label for the action.
     * @param {string} label
     * @returns {this} 
     */
    label(label)
    {
      this.labelAction = label;
      return this;
    },

    hidden(callback)
    {
      this.isActionHidden = callback;
      return this;
    },

    isHidden(record)
    {
      return typeof this.isActionHidden === 'function' ? this.isActionHidden(record) : this.isActionHidden; 
    },

    /**
     * Executes the callback function for the action.
     * @param {any} item
     */
    handle(item)
    {
      if (this.callback)
      {
        this.callback(item);
      }

    },

    getClass(){
      return this.classAction
    },
    getLabel(){
      return this.labelAction
    },
    getIcon(){
      return this.iconAction
    },
    getConfirmAction(){
      return this.confirmAction;
    }
  };
}
