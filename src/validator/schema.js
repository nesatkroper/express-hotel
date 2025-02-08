(async () => {
  const { type } = await import("arktype");
  const testSchema = type({
    name: "string",
    age: "number",
  });

  module.exports = { testSchema };
})();
