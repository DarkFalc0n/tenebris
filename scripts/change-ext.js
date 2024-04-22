const path = process.argv[2];
const ext = "." + process.argv[3];
const getFileName = (path) => path.split("/").slice(-1)[0];
const changeExt = (name) => name.split(".")[0].concat(ext);

console.log(changeExt(getFileName(path)));
