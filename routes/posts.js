const router = require('express').Router();
const verify = require('./verifyToken')
router.get('/posts', verify, (req, res) => {
    res.json({
        post: {
            title: 'my first tile'
        }
    })
})

module.exports = router;