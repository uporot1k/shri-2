import lint from "../src/linter";
const testJSON = `{
  "block": "page",
  "content": [
    {
      "block": "grid",
      "mods": {
        "m-columns": "10"
      },
      "content": [
        {
          "block": "grid",
          "elem": "fraction",
          "elemMods": {
            "m-col": "2"
          },
          "content": [
            {
              "block": "payment"
            }
          ]
        },
        {
          "block": "grid",
          "elem": "fraction",
          "elemMods": {
            "m-col": "5"
          },
          "content": [
            {
              "block": "offer"
            }
          ]
        }
      ]
    }
  ]
}`;

const report = lint(testJSON);

console.log(report);
