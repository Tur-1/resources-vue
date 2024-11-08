class ResourceFilterException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ResourceFilterException';
  }

 
  static missingType(className) {
    return new ResourceFilterException(`The 'type' property must be implemented in the  ${className}`);
  }
 
  static missingOptionsMethod(className) {
    return new ResourceFilterException(`You must implement the options method in the Filter:  ${className}`);
  }
}

export default ResourceFilterException;
