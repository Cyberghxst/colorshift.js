const { pkgName } = require('./constants');

const error = (message) => {
    console.log(`\x1b[31m${pkgName} Error:\x1b[0m`, message);
}
const success = (message) => {
    console.log(`\x1b[32m${pkgName} Client:\x1b[0m`, message);
}

module.exports = {
    error,
    success
};