import apiWrapper from "./transformJsonKeys";
import { JsonStructure } from "./transformJsonKeys";

const apiResponse: JsonStructure = [
  {
    id: "0",
    name: "John",
    follow: 1,
    following: 2,
  },
  {
    id: "1",
    name: "Maria",
    follow: 2,
    following: 3,
  },
];
const schema = {
  id: "userId",
};

const mapped = apiWrapper(apiResponse, schema);

console.log("mapped", mapped);
