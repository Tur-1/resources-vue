class ResourceFilterException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ResourceFilterException';
  }

  /**
  * Exception for missing Type .
  */
  static missingType(className) {
    return new ResourceFilterException(`The 'type' property must be implemented in the  ${className}`);
  }

}

export default ResourceFilterException;
