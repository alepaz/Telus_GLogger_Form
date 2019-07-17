module.exports = (req, res, next) => {
    if(!req.user) {
        //Send status to the request
        return res.status(401).send({ error: 'You must log in'});
    }

    next();
};
