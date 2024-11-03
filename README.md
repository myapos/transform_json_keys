# JSON Key Transformer

> Made with Bun

<p align="left">
<a href="https://bun.sh/"><img src="https://img.shields.io/badge/bun-v1.1.29-green.svg" alt="Bun"></a>
    <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-v6.14.8-blue.svg" alt="NPM"></a>
        <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-v20.18.0-green.svg" alt="Node.js">
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-v5.0.0-blue.svg" alt="TypeScript"></a>
</p>

This utility provides a function to transform the keys of a nested JSON object according to a provided schema. It supports complex JSON structures with varying levels of nesting and mixed types.

## Features

- Recursively maps keys of nested objects.
- Supports arrays and mixed types within the JSON structure.
- Allows for flexible key transformation using a schema.

## Installation

To use this utility, you can install it via npm:

```bash
npm install transform_json_keys
```

or

```bash
bun install transform_json_keys
```

and then

```bash
import { transformJsonKeys } from "transform_json_keys";
import type { JsonStructure } from "transform_json_keys";
```

## Fork the Repository

To fork the repository, use the following command:

```bash
git clone https://github.com/myapos/transform_json_keys.git
```

### Install Dependencies

To install the necessary dependencies, run:

```bash
bun install
```

### Running Tests

To run the tests, use:

```bash
bun test
```

## Usage

### Example 1: Basic Transformation

```typescript
import { transformJsonKeys } from "transform_json_keys";
import type { JsonStructure } from "transform_json_keys";

const apiResponse: JsonStructure = {
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
//   user: {
//     userId: 1,
//     userName: 'John Doe',
//     street: {
//       userStreet: '123 Main St',
//       userCity: 'Anytown'
//     }
//   }
// }
```

### Example 2: Handling Arrays

```typescript
import { transformJsonKeys } from "transform_json_keys";
import type { JsonStructure } from "transform_json_keys";

const apiResponseWithArray: JsonStructure = {
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

```typescript
import { transformJsonKeys } from "transform_json_keys";
import type { JsonStructure } from "transform_json_keys";

const nestedApiResponse: JsonStructure = {
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

## Use Cases

### 1. API Response Transformation

When working with APIs, the response data might not always be in the desired format. This utility can help transform the keys of the JSON response to match the expected format in your application.

### 2. Data Normalization

In data processing pipelines, it's often necessary to normalize data from different sources. This utility can be used to standardize the keys of JSON objects, making it easier to merge and analyze data.

### 3. Configuration Management

For applications that rely on configuration files in JSON format, this utility can help transform configuration keys to match the required schema, ensuring consistency across different environments.

### 4. Logging and Monitoring

When logging JSON data, it's important to have a consistent key format for easier searching and monitoring. This utility can transform the keys of JSON logs to a standardized format.

### 5. Data Migration

During data migration processes, the structure of JSON data might need to change. This utility can assist in transforming the keys of JSON objects to match the new schema, simplifying the migration process.

### 6. Frontend State Management

In frontend applications, managing state often involves transforming data received from APIs. This utility can help transform the keys of JSON objects to match the state structure required by the frontend framework.

### 7. Form Data Handling

When dealing with form submissions, the keys of the JSON data might need to be transformed to match the backend schema. This utility can automate the transformation, reducing the need for manual key mapping.
