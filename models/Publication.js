const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true , minlength:[6,'Title must be min 6 characters']},
    paintingTechnidue: { type: String, required: true, maxlength:[15,'Paint technique must be max 15 characters'] },
    artPictureUrl: { type: String, required: true, match: [/^https?/, 'Publication image must be a valid URL'] },
    certificate: { type: String, required: true,match :[/^Yes|No$/, 'Certificate mus be "Yes o No" !' ]},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    userShared: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]

})
module.exports = model('Publication', schema)