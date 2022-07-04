const router = require('express').Router();



router.get('/register', (req, res) => {

    res.render('register', { title: 'Register' });
});


router.post('/register', async (req, res) => {
    try {

        await req.auth.register(req.body);
        res.redirect('/publication');
    } catch (err) {
        const ctx = {
            title: 'Register',
            error: err.message,
            data: {
                email: req.body.email,
                gender: req.body.gender
            }
        }
        res.render('register', ctx);
    }
})


router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});



router.post('/login', async (req, res) => {
    try {

        await req.auth.login(req.body);
        res.redirect('/publication');
    } catch (err) {
        const ctx = {
            title: 'Login',
            error: err.message,
            data: {
                username: req.body.username,
                password: req.body.password
            }
        };

        res.render('login', ctx);
    }
});

router.get('/profile', async (req, res) => {

    const user = req.user;

    const publications = await req.storage.getAllPublications(user._id)

    const allPub = publications.map((x) => { return x.title }).join(', ')

    let arr = await req.storage.getAll(req.query)



    const results = await req.storage.getAllPub(user._id)
    let titles = results.map((x) => { return x.title }).join(', ')
    const ctx = {
        title: 'Profile',
        user,
        publications,
        allPub,
        titles

    }

    res.render('profile', ctx);
});


router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});


module.exports = router;