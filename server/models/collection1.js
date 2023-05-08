const mongoose = require('mongoose')
const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id:
    {
        type: Number,
        required: true,
    },
},
    {
        versionKey: false,
    }
);

const collect = mongoose.model('collection1', UserModel);
module.exports = collect;