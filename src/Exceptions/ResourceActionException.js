class ResourceActionException extends Error {
  /**
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    this.name = 'BaseActionException';
  }

  
  static missingMakeMethod(className) {
    return new ResourceActionException(`You must implement ' make ' method in the action:  ${className}`);
  }
}

export default ResourceActionException;
