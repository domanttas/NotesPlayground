const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        validate(value) {
            if (isNaN(Date.parse(value))) {
                throw new Error('Invalid date format');
            }
        }
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    colaborators: [{
        colaboratorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }]
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;
