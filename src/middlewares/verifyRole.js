const ApiError = require('../utils/apiError');

const verifyRole = (role = []) => {
    if(typeof role === 'string') {
        role = [role];
    }
    return (req, res, next) => {
        if (role.length && role.includes(req.user.role)) {
            next();
        } else {
            return res.status(200).send(ApiError.errorCode403("Unauthorized"));
        }
    };
}

module.exports = verifyRole;