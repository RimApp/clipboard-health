const crypto = require("crypto");

exports.deterministicPartitionKey = event => {
	const DEFAULT_PARTITION_KEY = "0";
	const MAX_PARTITION_KEY_LENGTH = 256;

	const partitionKey = event
		? event.partitionKey || crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
		: DEFAULT_PARTITION_KEY;
	return typeof partitionKey !== "string"
		? JSON.stringify(partitionKey)
		: partitionKey.length > MAX_PARTITION_KEY_LENGTH
		? crypto.createHash("sha3-512").update(partitionKey).digest("hex")
		: partitionKey;
};
