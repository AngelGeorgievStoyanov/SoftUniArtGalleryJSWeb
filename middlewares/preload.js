function preloadPublication() {
    return async (req, res, next) => {
        req.data = req.data || {};

        try {
            const publication = await req.storage.getById(req.params.id);
          
            if (publication) {
                req.data.publication = publication;

            }
        } catch (err) {
            console.error('Database error:', err.message);
        }

        next();
    };
}

module.exports = {
    preloadPublication
};