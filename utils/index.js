// @ts-nocheck
const glob = require('glob');

const fileNames = [];
const files = glob.sync('src/*.ejs');

for (const file of files) {
  fileNames.push(file.slice(4).slice(0, -4));
}

module.exports = {
  fileNames,
};
