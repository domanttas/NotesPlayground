const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);

        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: 'Invalid email or password' });
    }
});

router.get('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            console.log(req.token);
            console.log(req.token !== token);
            return token === req.token;
        });

        await req.user.save();

        res.status(200).send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;