const express = require('express');

const auth = require('../middleware/auth');
const Note = require('../models/note');
const User = require('../models/user');

const router = new express.Router();

router.post('/note', auth, async (req, res) => {
    try {
        req.body.creator = req.user._id;
        const note = new Note(req.body);

        await note.save();

        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/note', auth, async (req, res) => {
    try {
        const notes = await Note.find({ creator: req.user._id });

        res.status(200).send(notes);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get('/note/colabs', auth, async (req, res) => {
    try {
        const notes = await Note.find({ 'colaborators.colaboratorId': req.user._id });

        res.status(200).send(notes);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/note/:noteId', auth, async (req, res) => {
    try {
        await Note.deleteOne({ _id: req.params.noteId });

        res.status(200).send();
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;