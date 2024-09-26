class BaseResourceException extends Error {
  constructor(message) {
    super(message);
    this.name = 'BaseResourceException';
  }

  /**
  * Exception for missing data method.
  */
  static missingDataMethod(className) {
    return new BaseResourceException(
      `The data() method must return a Promise that resolves with an object containing 'data' and optionally 'pagination' in the Resource" ${className}`);

  }

  /**
   * Exception for missing fields method.
   */
  static missingFieldsMethod(className) {
    return new BaseResourceException(`You must implement the Fields method in the Resource ${className}`);
  }


  /**
   * Exception for invalid or missing pagination query key.
   */
  static invalidPaginationQueryKey(key, url) {
    return new BaseResourceException(
      `Pagination query key '${key}' in the Resource does not match the URL pagination query key : ${url}`
    );
  }
}

export default BaseResourceException;
