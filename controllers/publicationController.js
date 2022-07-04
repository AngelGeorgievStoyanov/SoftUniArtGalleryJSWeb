const { Router } = require('express');
const { preloadPublication } = require('../middlewares/preload')
const { isOwner } = require('../middlewares/guards')
const userService = require('../services/user')
const router = Router();



router.get('/', async (req, res) => {

    const publications = await req.storage.getAll(req.query)
  
    const ctx = {
        title: 'Publications',
        publications
    }



    res.render('index', ctx)
})



router.get('/create', async (req, res) => {


    res.render('create', { title: 'Create Trip' })
})

router.post('/create', async (req, res) => {
    const publication = {
        title: req.body.title,
        paintingTechnidue: req.body.paintingTechnidue,
        artPictureUrl: req.body.artPictureUrl,
        certificate: req.body.certificate,
        author: req.user._id,



    }


    try {

        await req.storage.create(publication);

        res.redirect('/')
    } catch (err) {
        let arr = err.message.split(', ')
        const ctx = {
            title: 'Create Publication',
            error: arr,
            publication
        }


        res.render('create', ctx);
    }
})



router.get('/gallery', async (req, res) => {

    const publications = await req.storage.getAll(req.query)

   
    const ctx = {
        title: 'Publications',
        publications
    }


    res.render('gallery', ctx)

})

router.get('/details/:id', preloadPublication(),  async (req, res) => {

    const publication = req.data.publication;

    let isowner = false;
    if (publication == undefined) {
        res.redirect('/404');
    } else {
         let userShared = false;
             let usersShared;

        if (req.user) {

            if (req.data.publication.author._id == req.user._id) {
                isowner = true;
            }

            usersShared = publication.userShared;

           for (const userSh of usersShared) {

               if (userSh == req.user._id) {
                   userShared = true;
                   break;
               }

           }

        }

      
        const ctx = {
            title: 'Publication',
            publication,
            isowner,
            userShared
           
        }


        res.render('details', ctx);
    }
});


router.get('/shared/:id',preloadPublication(), async (req, res) => {
    const publication = req.data.publication;
    
    const userId = req.user._id;

    publication.userShared.push(userId);
    const ctx = {
        title: 'Publication',
        publication
    };

    try {
        await req.storage.sharedPublication(publication._id, publication)


    } catch (err) {
        error = err.message
    }

    res.redirect(`/publication/details/${publication._id}`)
})


router.get('/edit/:id', preloadPublication(), isOwner(), async (req, res) => {
    const publication = req.data.publication;


    if (!publication) {
        res.redirect('/404')
    } else {
        const ctx = {
            title: 'Edit publication',
            publication
        }
      
        res.render('edit', ctx)
    }
})

router.post('/edit/:id', async (req, res) => {
    const publication = {
        title: req.body.title,
        paintingTechnidue: req.body.paintingTechnidue,
        artPictureUrl: req.body.artPictureUrl,
        certificate: req.body.certificate,     
        userShared: req.body.userShared
    }

    try {
        await req.storage.edit(req.params.id, publication)
        res.redirect(`/publication/details/${req.params.id}`)
    } catch (err) {
        const ctx = {
            title: 'Edit publication',
            error: err.message,
            publication
        };
        res.render('edit', ctx)
    }
})

router.get('/delete/:id', preloadPublication(), isOwner(), async (req, res) => {
    const publication = req.data.publication;


    if (!publication) {
        res.redirect('/404')
    } else {
        await req.storage.deletePublication(publication._id);
        res.redirect('/publication/gallery')
    }
})

module.exports = router;