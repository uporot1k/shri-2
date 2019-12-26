import parser from "./parser";
import Validator from "./validator";
import traverse from "@babel/traverse";
function lint() {
  let input = `{
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
  // console.log(JSON.parse(input));
  const ast = parser(input);

  traverse(ast, {
    enter(path) {
      // in this example change all the variable `n` to `x`
      console.log(path)
    },
  });
  console.log(ast);
  const validator = new Validator(ast);
  // console.log(validator);
  validator.run();

  return validator.report();
}

export default lint;
