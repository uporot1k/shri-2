// import lint from '../src/linter'

const testJSON = `{
  "block": "page",
  "content": [
    {
      "block": "text",
      "mods": { "type": "h1", "size": "l" }
    },
    {
        "block": "text",
        "mods": { "type": "h3", "size": "l" }
    },
    {
        "block": "text",
        "mods": { "type": "h3", "size": "l" }
    },
    {
      "block": "text",
      "mods": { "type": "h1", "size": "l" }
    },
    {
        "block": "text",
        "mods": { "type": "h2", "size": "l" }
    },
    {
      "block": "text",
      "mods": { "type": "h3", "size": "l" }
    },
    {
      "block": "text",
      "mods": { "type": "h1", "size": "l" }
    }
  ]
}`;

const report = lint(testJSON);

console.log(report);
