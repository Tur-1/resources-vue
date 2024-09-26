class ResourceActionException extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    this.name = 'BaseActionException';
  }

  /**
   * missing handle method.
   * @param {string} className 
   * @returns {ResourceActionException} 
   */
  static missingHandleMethod(className) {
    return new ResourceActionException(`You must implement the handle method in the action ${className}`);
  }
}

export default ResourceActionException;
