import { expect, it, describe } from "bun:test";

import transformJsonKeys, { JsonStructure } from "../transformJsonKeys";

describe("transformJsonKeys", () => {
  describe("array", () => {
    it("should return empty array", () => {
      const apiResponse: JsonStructure = [];
      const schema = {};
      const expectedTransformed: JsonStructure = [];
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should transform keys in first level with array", () => {
      const apiResponse: JsonStructure = [
        {
          id: "0",
          name: "Alice",
          age: 30,
          city: "New York",
        },
        {
          id: "1",
          name: "Bob",
          age: 25,
          city: "Los Angeles",
        },
      ];
      const schema = {
        id: "userId",
        name: "fullName",
      };

      const expectedTransformed: JsonStructure = [
        {
          userId: "0",
          fullName: "Alice",
          age: 30,
          city: "New York",
        },
        {
          userId: "1",
          fullName: "Bob",
          age: 25,
          city: "Los Angeles",
        },
      ];
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should transform keys in deeper level with array", () => {
      const apiResponse: JsonStructure = [
        {
          id: "0",
          name: "Alice",
          age: 30,
          address: {
            city: "New York",
            zip: "10001",
          },
        },
        {
          id: "1",
          name: "Bob",
          age: 25,
          address: {
            city: "Los Angeles",
            zip: "90001",
          },
        },
      ];

      const schema = {
        "address.city": "location",
      };

      const expectedTransformed: JsonStructure = [
        {
          id: "0",
          name: "Alice",
          age: 30,
          address: {
            location: "New York",
            zip: "10001",
          },
        },
        {
          id: "1",
          name: "Bob",
          age: 25,
          address: {
            location: "Los Angeles",
            zip: "90001",
          },
        },
      ];
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should transform keys in deeper level with array and nested keys", () => {
      const apiResponse: JsonStructure = [
        {
          id: "0",
          name: "Alice",
          age: 30,
          address: {
            city: "New York",
            zip: "10001",
            contacts: [
              {
                type: "email",
                value: "alice@example.com",
              },
            ],
          },
        },
        {
          id: "1",
          name: "Bob",
          age: 25,
          address: {
            city: "Los Angeles",
            zip: "90001",
            contacts: [
              {
                type: "email",
                value: "bob@example.com",
              },
            ],
          },
        },
      ];

      const schema = {
        "address.contacts.value": "contactInfo",
      };

      const expectedTransformed: JsonStructure = [
        {
          id: "0",
          name: "Alice",
          age: 30,
          address: {
            city: "New York",
            zip: "10001",
            contacts: [
              {
                type: "email",
                contactInfo: "alice@example.com",
              },
            ],
          },
        },
        {
          id: "1",
          name: "Bob",
          age: 25,
          address: {
            city: "Los Angeles",
            zip: "90001",
            contacts: [
              {
                type: "email",
                contactInfo: "bob@example.com",
              },
            ],
          },
        },
      ];
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should handle arrays of strings", () => {
      const apiResponse: JsonStructure = [
        {
          id: "0",
          hobbies: ["reading", "traveling"],
        },
        {
          id: "1",
          hobbies: ["cooking", "swimming"],
        },
      ];
      const schema = {
        id: "userId",
        hobbies: "interests",
      };

      const expectedTransformed: JsonStructure = [
        {
          userId: "0",
          interests: ["reading", "traveling"],
        },
        {
          userId: "1",
          interests: ["cooking", "swimming"],
        },
      ];
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should handle mixed types in arrays", () => {
      const apiResponse: JsonStructure = [
        {
          id: "0",
          data: [1, "string", true, null],
        },
        {
          id: "1",
          data: [2, "another string", false, undefined],
        },
      ];
      const schema = {
        id: "userId",
      };

      const expectedTransformed: JsonStructure = [
        {
          userId: "0",
          data: [1, "string", true, null],
        },
        {
          userId: "1",
          data: [2, "another string", false, undefined],
        },
      ];
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });
  });

  describe("objects", () => {
    it("should return empty object", () => {
      const apiResponse = {};
      const schema = {};
      const expectedTransformed = {};
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should handle null values", () => {
      const apiResponse = {
        test: null,
      };
      const schema = {
        test: "transformed",
      };
      const expectedTransformed = {
        transformed: null,
      };
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should handle undefined values", () => {
      const apiResponse = {
        test: undefined,
      };
      const schema = {
        test: "transformed",
      };
      const expectedTransformed = {
        transformed: undefined,
      };
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should transform keys in first level with object", () => {
      const apiResponse: JsonStructure = {
        id: "0",
        name: "Alice",
      };

      const schema = {
        id: "userId",
        name: "fullName",
      };

      const expectedTransformed: JsonStructure = {
        userId: "0",
        fullName: "Alice",
      };
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should transform keys in deeper level with object", () => {
      const apiResponse: JsonStructure = {
        id: 0,
        profile: {
          name: "Alice",
          age: 30,
          address: {
            city: "New York",
            zip: "10001",
          },
        },
      };

      const schema = {
        id: "userId",
        "profile.name": "fullName",
      };

      const expectedTransformed: JsonStructure = {
        userId: 0,
        profile: {
          fullName: "Alice",
          age: 30,
          address: {
            city: "New York",
            zip: "10001",
          },
        },
      };

      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should transform keys in deeper level with object and combined data", () => {
      const apiResponse: JsonStructure = {
        users: [
          {
            id: "0",
            name: "Alice",
            age: 30,
            address: {
              city: "New York",
              zip: "10001",
            },
          },
          {
            id: "1",
            name: "Bob",
            age: 25,
            address: {
              city: "Los Angeles",
              zip: "90001",
            },
          },
        ],
        isActive: true,
      };
      const schema = {
        isActive: "status",
        "users.id": "userId",
        "users.name": "fullName",
        "users.address.city": "location",
      };

      const expectedTransformed: JsonStructure = {
        status: true,
        users: [
          {
            userId: "0",
            fullName: "Alice",
            age: 30,
            address: {
              location: "New York",
              zip: "10001",
            },
          },
          {
            userId: "1",
            fullName: "Bob",
            age: 25,
            address: {
              location: "Los Angeles",
              zip: "90001",
            },
          },
        ],
      };

      const transformedResponse = transformJsonKeys(apiResponse, schema);
      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should transform keys in deeper level with object and combined large data", () => {
      const NUM_OF_USERS = 100000;
      const createUsers = (num: number) => {
        const users = [];

        for (let i = 0; i < num; i++) {
          users.push({
            id: i,
            name: `user ${i}`,
            age: 30,
            address: {
              city: "City",
              zip: "00000",
            },
          });
        }
        return users;
      };

      const createExpectedUsers = (num: number) => {
        const users = [];

        for (let i = 0; i < num; i++) {
          users.push({
            userId: i,
            fullName: `user ${i}`,
            age: 30,
            address: {
              location: "City",
              zip: "00000",
            },
          });
        }
        return users;
      };

      const apiResponse: JsonStructure = {
        users: [...createUsers(NUM_OF_USERS)],
        isActive: true,
      };
      const schema = {
        isActive: "status",
        "users.id": "userId",
        "users.name": "fullName",
        "users.address.city": "location",
      };

      const expectedTransformed: JsonStructure = {
        status: true,
        users: [...createExpectedUsers(NUM_OF_USERS)],
      };

      const transformedResponse = transformJsonKeys(apiResponse, schema);
      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should handle nested arrays within objects", () => {
      const apiResponse: JsonStructure = {
        id: "0",
        profile: {
          hobbies: ["reading", "traveling"],
        },
      };
      const schema = {
        id: "userId",
        "profile.hobbies": "interests",
      };

      const expectedTransformed: JsonStructure = {
        userId: "0",
        profile: {
          interests: ["reading", "traveling"],
        },
      };
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should handle deeply nested objects", () => {
      const apiResponse: JsonStructure = {
        id: "0",
        profile: {
          details: {
            info: {
              name: "Alice",
              age: 30,
            },
          },
        },
      };
      const schema = {
        "profile.details.info.name": "fullName",
        "profile.details.info.age": "yearsOld",
      };

      const expectedTransformed: JsonStructure = {
        id: "0",
        profile: {
          details: {
            info: {
              fullName: "Alice",
              yearsOld: 30,
            },
          },
        },
      };
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });

    it("should handle objects with mixed types", () => {
      const apiResponse: JsonStructure = {
        id: "0",
        active: true,
        score: 100,
        profile: {
          name: "Alice",
          hobbies: ["reading", "traveling"],
        },
      };
      const schema = {
        id: "userId",
        active: "isActive",
        score: "points",
        "profile.name": "fullName",
        "profile.hobbies": "interests",
      };

      const expectedTransformed: JsonStructure = {
        userId: "0",
        isActive: true,
        points: 100,
        profile: {
          fullName: "Alice",
          interests: ["reading", "traveling"],
        },
      };
      const transformedResponse = transformJsonKeys(apiResponse, schema);

      expect(transformedResponse).toEqual(expectedTransformed);
    });
  });
});
