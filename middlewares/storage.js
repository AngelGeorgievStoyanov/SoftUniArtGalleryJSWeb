const publicationService = require('../services/publication');
async function init() {
    return (req, res, next) => {
        const storage = Object.assign({},publicationService );
        req.storage = storage;
        next();
    };
}

module.exports = init;