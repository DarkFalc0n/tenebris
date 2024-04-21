const path = process.argv[2];
const getFileName = (path) => path.split("/").slice(-1)[0];
const toJSON = (name) => name.split(".")[0].concat(".json");

console.log(toJSON(getFileName(path)));
