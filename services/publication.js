const User = require('../models/User')
const Publication = require('../models/Publication')


async function create(publication) {
    const record = new Publication(publication);

    await record.save();
    return record;
}


async function getAll(query) {
    const options = {};

    if (query.search) {
        options = { regex: query.search, $options: 'i' }

    }

    const publications = Publication.find(options).lean()

    return await publications
}


async function getById(id) {
    const publication = await Publication.findById(id).populate('author').lean()

    if (publication) {
        const viewModel = {
            _id: publication._id,
            title: publication.title,
            paintingTechnidue: publication.paintingTechnidue,
            artPictureUrl: publication.artPictureUrl,
            certificate: publication.certificate,
            author: publication.author,
            userShared: publication.userShared


        }
        return viewModel;
    } else {
        return undefined;
    }
}

function deletePublication(publicationId) {
    return Publication.deleteOne({ _id: publicationId })
}

async function edit(id, publication) {
    const exsisting = await Publication.findById(id);

    if (!exsisting) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(exsisting, publication);
    return exsisting.save();

}

async function sharedPublication(id, publication) {
    const exsisting = await Publication.findById(id);

    if (!exsisting) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(exsisting, publication);
    return exsisting.save();
}

async function getAllPublications(userId) {

    return await Publication.find({ "author": `${userId}` }).lean();



}


async function getAllPub(userId){

 return await Publication.find({"userShared":`${userId}`})
 
    
}





module.exports = {
    create,
    getAll,
    getById,
    deletePublication,
    edit,
    sharedPublication,
    getAllPublications,
    getAllPub
   
}