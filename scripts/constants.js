const data = require("fs").readFileSync(process.argv[2], "utf8");
let output = "enum CONSTANTS {\r";
data
  .split(/[\n\r]+/)
  .filter((line) => !!line)
  .map((line) => line.split("\t"))
  .forEach(([...params]) => {
    const name = params[params.length - 1];
    const id = name.replace("-", "_").toUpperCase();
    output += `\t${id} = "${name}",\r`;
  });
output += "}\rexport default CONSTANTS;";
console.log(output);
