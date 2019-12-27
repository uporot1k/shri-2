import lint from '../src/linter';
const testJSON = `{
  "block": "grid",
  "mods": {
      "m-columns": "10"
  },
  "content": [
      {
          "block": "grid",
          "elem": "fraction",
          "elemMods": {
              "m-col": "8"
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
              "m-col": "2"
          },
          "content": [
              {
                  "block": "offer"
              }
          ]
      }
  ],
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
              "m-col": "8"
          },
          "content": [
              {
                  "block": "offer"
              }
          ]
      }
  ]
}`;

const report = lint(JSON.stringify(testJSON));

console.log(report);