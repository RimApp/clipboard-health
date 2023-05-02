const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
	const event = { id: 1, name: "John Doe" };
	const jsonEvent = JSON.stringify(event);
	const hash = crypto.createHash("sha3-512").update(jsonEvent).digest("hex");

	it("should return default partition key when event is undefined", () => {
		expect(deterministicPartitionKey(undefined)).toBe("0");
	});

	it("should return default partition key when event is null", () => {
		expect(deterministicPartitionKey(null)).toBe("0");
	});

	it("should return event partition key if present", () => {
		const partitionKey = "123";
		expect(deterministicPartitionKey({ partitionKey })).toBe(partitionKey);
	});

	it("should return hash of event if partition key is not present", () => {
		expect(deterministicPartitionKey(event)).toBe(hash);
	});

	it("should stringify non-string partition keys", () => {
		expect(deterministicPartitionKey({ partitionKey: 123 })).toBe("123");
	});

	it("should stringified partition key when event is not a string", () => {
		expect(deterministicPartitionKey({ partitionKey: event })).toBe(jsonEvent);
	});

	it("returns hashed partition key when length is greater than 256", () => {
		const longKey = "x".repeat(300);
		const expectedKey = crypto.createHash("sha3-512").update(longKey).digest("hex");
		expect(deterministicPartitionKey({ partitionKey: longKey })).toBe(expectedKey);
	});
});
