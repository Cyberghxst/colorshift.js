const color = require('gradient-string');
const verdeLigero = '#00B347';
const verdeSaturado = '#0E813C';
const rojo1 = '#FF4040';
const rojo2 = '#CC0000';
const amarillo1 = '#FFFF40';
const amarillo2 = '#CCCC00';
const { pkgName } = require('./constants');
const developmentLog = (message) => {
    console.log(color.teen(`${pkgName} Log:`), message);
}
const error = (message) => {
    console.log(color(rojo1, rojo2)(`${pkgName} Error:`), message);
}
const success = (message) => {
    console.log(color(verdeSaturado, verdeLigero)(`${pkgName} Client:`), message);
}
const warning = (message) => {
    console.log(color(amarillo1, amarillo2)(`${pkgName} Warn:`), message);
}

module.exports = {
    developmentLog,
    error,
    success,
    warning
};