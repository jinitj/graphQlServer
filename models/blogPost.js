const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    blogPostBody: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    creationTimeStamp: {
        type: Date,
        retuired: true
    },
}, 
{timestamps: true}
);

module.exports = mongoose.model('blogPost', blogPostSchema);