/**
 * Represents a JSON structure that can be one of the following types:
 * - `string`
 * - `number`
 * - `boolean`
 * - An object with string keys and values of type `JsonStructure`
 * - An array of `JsonStructure`
 * - An array of primitive types (`string`, `number`, `boolean`, `null`, `undefined`)
 * - `null`
 * - `undefined`
 */
export type JsonStructure =
  | string
  | number
  | boolean
  | { [key: string]: JsonStructure }
  | JsonStructure[]
  | (string | number | boolean | null | undefined)[]
  | null
  | undefined;

const buildParentKey = (
  parentKey: string | undefined,
  responseKey: string
): string => (parentKey ? `${parentKey}.${responseKey}` : responseKey);

/**
 * Recursively maps the keys of a JSON structure based on a provided schema.
 *
 * @param response - The JSON structure to transform. It can be an object, array, or primitive value.
 * @param schema - A mapping of original keys to new keys. The keys in the schema should be in the format of "parentKey.currentKey".
 * @param parentKey - The parent key used to build the full key path for nested objects. Defaults to an empty string.
 * @returns The transformed JSON structure with keys mapped according to the schema.
 */
const mapKeys = (
  response: JsonStructure,
  schema: Record<string, string>,
  parentKey: string = ""
): JsonStructure => {
  if (response == null) {
    return response;
  }

  if (Array.isArray(response)) {
    return response.map((item) => mapKeys(item, schema, parentKey));
  }

  if (typeof response === "object" && !Array.isArray(response)) {
    return Object.keys(response).reduce((acc, responseKey) => {
      const newParentKey = buildParentKey(parentKey, responseKey);
      const newKey = schema[newParentKey] || responseKey;

      const value = response[responseKey];
      acc[newKey] = mapKeys(value, schema, newParentKey);
      return acc;
    }, {} as Record<string, JsonStructure>);
  }
  return response;
};

const transformJsonKeys = (
  apiResponse: JsonStructure,
  schema: Record<string, string>
): JsonStructure => {
  if (Array.isArray(apiResponse) && apiResponse.length === 0)
    return apiResponse;
  if (
    apiResponse &&
    typeof apiResponse === "object" &&
    Object.keys(apiResponse).length === 0
  )
    return apiResponse;

  return mapKeys(apiResponse, schema, "");
};

export default transformJsonKeys;
