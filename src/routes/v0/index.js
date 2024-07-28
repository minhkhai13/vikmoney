const express = require('express');
const router = express.Router();

const authRouter  = require('./auth.route');
const userRoter = require('./user.route');

const defaultRouter = [
    {
        path: '/auth',
        router: authRouter 
    },
    {
        path: '/user',
        router: userRoter
    }
]

defaultRouter.forEach((route) => {
    router.use(route.path, route.router);
});

module.exports = router;