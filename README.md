# JSON Key Transformer

This utility provides a function to transform the keys of a nested JSON object according to a provided schema. It supports complex JSON structures with varying levels of nesting and mixed types.

## Features

- Recursively maps keys of nested objects.
- Supports arrays and mixed types within the JSON structure.
- Allows for flexible key transformation using a schema.

## Installation

To use this utility, you can install it via bun:

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

To run tests:

```bash
bun test
```

## Usage

Here are some examples of how to use the `transformJsonKeys` function:

### Example 1: Basic Transformation

```javascript
import transformJsonKeys from "./path/to/transformJsonKeys";

const apiResponse = {
  user: {
    id: 1,
    name: "John Doe",
    address: {
      street: "123 Main St",
      city: "Anytown",
    },
  },
};

const schema = {
  "user.id": "userId",
  "user.name": "userName",
  "user.address.street": "userStreet",
  "user.address.city": "userCity",
};

const transformedResponse = transformJsonKeys(apiResponse, schema);

console.log(transformedResponse);
// Output:
// {
//   userId: 1,
//   userName: 'John Doe',
//   userStreet: '123 Main St',
//   userCity: 'Anytown'
// }
```

### Example 2: Handling Arrays

```javascript
const apiResponseWithArray = {
  users: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ],
};

const schemaWithArray = {
  "users.id": "userId",
  "users.name": "userName",
};

const transformedResponseWithArray = transformJsonKeys(
  apiResponseWithArray,
  schemaWithArray
);

console.log(transformedResponseWithArray);
// Output:
// {
//   users: [
//     { userId: 1, userName: 'John Doe' },
//     { userId: 2, userName: 'Jane Smith' }
//   ]
// }
```

### Example 3: Nested Objects

```javascript
const nestedApiResponse = {
  user: {
    profile: {
      firstName: "John",
      lastName: "Doe",
    },
  },
};

const nestedSchema = {
  "user.profile.firstName": "first_name",
  "user.profile.lastName": "last_name",
};

const transformedNestedResponse = transformJsonKeys(
  nestedApiResponse,
  nestedSchema
);

console.log(transformedNestedResponse);
// Output:
// {
//   user: {
//     profile: {
//       first_name: 'John',
//       last_name: 'Doe'
//     }
//   }
// }
```
