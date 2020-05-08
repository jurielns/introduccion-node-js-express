const info = (texto) => {
    console.log('INFO', texto);
    return texto;
};

const error = (texto) => {
    console.log('ERROR', texto);
    return texto;
};

module.exports.info = info;
module.exports.error = error;
// module.exports = { info, error };
