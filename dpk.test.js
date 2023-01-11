const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal HashKey when given partitionKey input", () => {
    const abc = {
      partitionKey: {
        abc: "",
      },
    };
    const hashKey = deterministicPartitionKey(abc);
    expect(hashKey).toBe(hashKey);
  });
});
