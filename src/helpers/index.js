/**
 * Converts a string from camelCase or PascalCase to snake_case.
 * 
 * @param {string} str - The string to convert.
 * @returns {string} The snake_case version of the input string.
 */
export function toSnakeCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}