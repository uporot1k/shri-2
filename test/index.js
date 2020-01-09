import lint from "../src/linter";
const testJSON = `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": [
        {
          "block": "text",
          "mods": { "size": "l" },
          "content": [
            {
              "block": "text",
              "mods": { "size": "m" }
            }
          ]
        },
        {
          "block": "button",
          "mods": { "size": "l" }
        },
        {
          "block": "text",
          "mods": { "size": "l" }
        }
      ]
    } 
  ]
}`;

const report = lint(testJSON);

console.log(report);
