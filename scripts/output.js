const data = require("fs").readFileSync(process.argv[2], "utf8");
const result = {};
data
  .split(/[\n\r]+/)
  .filter((line) => !!line)
  .map((line) => line.split("\t"))
  .forEach(
    ([start, end, name]) => (result[name] = { start, end, loop: false }),
  );
console.log(JSON.stringify({ spritemap: result }, null, "\t"));
