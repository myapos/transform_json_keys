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
