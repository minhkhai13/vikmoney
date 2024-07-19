const express = require('express');
const router = express.Router();

const authRoter = require('./auth.route');

const defaultRouter = [
    {
        path: '/auth',
        router: authRoter
    }   
]

defaultRouter.forEach((route) => {
    router.use(route.path, route.router);
});

module.exports = router;