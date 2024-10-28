import { JsonStructure } from "./types";

/**
 * Constructs a full key path by combining a parent key and a response key.
 * If the parent key is provided, the response key is appended to it with a dot separator.
 * If the parent key is not provided, the response key is returned as is.
 *
 * @param parentKey - The parent key as a string or undefined.
 * @param responseKey - The response key to be appended.
 * @returns The combined key path as a string.
 */
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
