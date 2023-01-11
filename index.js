const { deterministicPartitionKey } = require("./dpk");

// const abc = "abc";
const abc = {
  partitionKey: {
    abc: "",
  },
};
// const abc = {
//   partitionKey: {
//     abc: "",
//   },
// };
console.log(deterministicPartitionKey(abc));
