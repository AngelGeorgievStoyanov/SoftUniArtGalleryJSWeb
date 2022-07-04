function isOwner() {
    return (req, res, next) => {
        if (req.data.publication && req.user && (req.data.publication.author._id == req.user._id)) {
            next()
        } else {
            res.redirect('/auth/login')
        }
    }
}

module.exports={
    isOwner
}