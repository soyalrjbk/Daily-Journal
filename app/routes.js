const ObjectId = require('mongodb').ObjectId;
module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    //GET (C"R"UD)
    app.get('/profile', isLoggedIn, function(req, res) {
        //Added { userId: req.user._id } inside find() so, user only sees their own entries and doesn't view all the entries from other users too
        db.collection('journal').find({ userId: req.user._id }).sort({ date: -1 }).toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            journal: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
          res.redirect('/')
        });
    });

// message board routes ===============================================================

    //CREATE ("C"RUD)
    //Added isLoggedIn to app.post() so, that the middleware redirects the unauthorized users and only lets authorized users to enter
    app.post('/journal',isLoggedIn, (req, res) => {
    //Used the recommended insertOne() instead of save() 
    //Added req.user._id inside the insertOne so, the user iD is saved alongside the entries and one user can't access other user's journal 
      db.collection('journal').insertOne({title: req.body.title, message: req.body.message, date: req.body.date, mood: req.body.mood, userId: req.user._id}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    //UPDATE (CR"U"D)
    app.put('/journal', isLoggedIn, (req, res) => {
      db.collection('journal').updateOne({_id: new ObjectId(req.body.id), userId: req.user._id}, {$set: {message: req.body.message}}, (err, result) => {
        if (err) return res.status(500).send(err)
          res.send('Entry Updated!')
        })
    })

    //DELETE (CRU"D")
    app.delete('/journal', isLoggedIn, (req, res) => {
    db.collection('journal').findOneAndDelete({ _id: new ObjectId(req.body.id), userId: req.user._id }, (err, result) => {
      if (err) return res.status(500).send(err)
      res.send('Entry Deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
