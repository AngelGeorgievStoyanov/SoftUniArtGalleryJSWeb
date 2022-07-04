const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true, minlength:[4,'Username must be min length 4 char'] },
    hashedPassword: { type: String, required: true, minlength:[3,'Password mus be min 3 char'] },
    adress: { type: String, required:true,maxlength:[20,'Adress must be max 20 char']  },
    publications: [{ type: Schema.Types.ObjectId, ref: 'Publication', default: []}]

})
module.exports = model('User', schema)