const router = require('express').Router();
const User = require('../model/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    registerValidation,
    loginValidation
} = require('../validation')


router.post('/register', async (req, res) => {
    //validate data before we a user
    validation = registerValidation(req.body)
    const {
        error
    } = validation

    //checking if user in database
    const emailExist = await User.findOne({
        email: req.body.email
    })
    if (emailExist) return res.status(400).send('email al ready exit')
    else {
        //Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //
        if (error) return res.status(400).send(error.details[0].message)
        else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            try {
                const savedUser = await user.save();
                res.send(savedUser)
            } catch (err) {
                res.status(400).send(err)
            }
        }
    }


});
router.post('/login', async (req, res) => {
    validation = loginValidation(req.body);
    const {
        error
    } = validation
    if (error) return res.status(400).send(error);
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).send('email does not ready exit')
    else {
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Invalid password')
        else {
            //Create and assign a token
            const token = jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token);
        }
    }
})

module.exports = router;