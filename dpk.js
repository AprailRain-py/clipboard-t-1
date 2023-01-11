const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate;

  if (event) {
    candidate = event.partitionKey
      ? event.partitionKey
      : createHash(JSON.stringify(event));
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(JSON.stringify(candidate));
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(event);
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};

/**
 *
 * @param {String} data
 */
function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}
