const mongoose = require('mongoose');

//schrma of db user collection
const CATSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    subcat: {
        type: String,
        required: true,
        // minlength: 8
    }
});

const CAT = mongoose.model('Categories', CATSchema);
module.exports = CAT;