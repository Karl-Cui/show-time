const User = require('../models/user').User
const Show = require('../models/show').Show
const { ObjectID } = require('mongodb')

module.exports = {

    /// Route for creating a new user
    /*
    Request body expects:
    {
    	"username": <username>,
    	"email": <email>,
      "password": <password>
    }
    */
    // Returned JSON is the newly created user document
    // POST /users
    create(req, res) {
        console.log(req.body)

        // Create a new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            is_admin: false,
            is_banned: false,
            bio: "",
            img: ""
        })

        // save user to database
        user.save().then((result) => {
            user.password = "";
            res.send(user);
            }, (error) => {
                res.status(400).send(error); // 400 for bad request
            })
    },

    /// Route for creating a new admin
    /*
    Request body expects:
    {
    	"username": <username>,
    	"email": <email>,
      "password": <password>
    }
    */
    // Returned JSON is the newly created user document
    // POST /users/admin
    createAdmin(req, res) {
        console.log(req.body)

        // Create a new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            is_admin: true,
            is_banned: false,
            bio: "",
            img: ""
        })

        // save user to database
        user.save().then((result) => {
            user.password = "";
            res.send(user);
            }, (error) => {
                res.status(400).send(error); // 400 for bad request
            })
    },

    /// Route for deleting a user
    // :id refers to user's ID
    // Returned JSON is the removed user document
    // GET /users/:id/delete
    remove(req, res) {
        const id = req.params.id

        // Good practice is to validate the id
        if (!ObjectID.isValid(id)) { return res.status(404).send() }

        User.findByIdAndRemove(id).then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                res.send( user )
            }
        })
    },

    /// Route for updating user information
    /*
    Request body expects:
    {
    	"username": <username>,
    	"email": <email>,
      "bio": <bio>,
      "img": <img>,
      "password": <password>,
      "is_banned": <is_banned>,
      "is_admin": <is_admin>
    }
    */
    // :id refers to user's ID
    // Returned JSON is the updated user document
    // POST /users/:id/update
    update(req, res) {
        const id = req.params.id

        // Good practice is to validate the id
        if (!ObjectID.isValid(id)) { return res.status(404).send() }

        User.findById(id).then( (user) => {
            if (!user){
                res.status(404).send();
            } else {

                // update user attributes
                user.email = (req.body.email) ? req.body.email : user.email;
                user.password = (req.body.password) ? req.body.password : user.password;
                user.bio = (req.body.bio) ? req.body.bio : user.bio;
                user.img = (req.body.img) ? req.body.img : user.img;

                if (req.body.is_banned != user.is_banned){
                    user.is_banned = req.body.is_banned;
                }

                if (req.body.is_admin != user.is_admin){
                    user.is_admin = req.body.is_admin;
                }

                user.save().then( (result) => {
                    res.send(result)
                }, (error) => {
                    res.status(400).send(error)
                })
            }
        }).catch((error) => {
            res.status(400).send(error);
        })
    },

    /// Route for getting user with id
    // :id refers to user's ID
    // Returned JSON is the user document
    // GET /users/:id
    getUser(req, res) {

        const id = req.params.id

        // Good practise is to validate the id
        if (!ObjectID.isValid(id)) {
        return res.status(404).send()
        }

        // Otheriwse, findById
        User.findById(id).then((student) => {
        if (!student) {
            res.status(404).send()
        } else {
            res.send( student )
        }

        }).catch((error) => {
            res.status(400).send(error)
        })
    },

    /// Route for getting the current logged in user
    // Returned JSON is the user document
    // GET /getsessionuser
    getSessionUser(req, res) {

        const id = req.session.user

        // Good practise is to validate the id
        if (!ObjectID.isValid(id)) {
        return res.status(404).send("no user")
        }

        // Otheriwse, findById
        User.findById(id).then((user) => {
          if (!user) {
              res.status(404).send()
          } else {
              user.password = ""
              res.send( user )
          }

        }).catch((error) => {
            res.status(400).send(error)
        })
    },

    /// Route for logging in user
    /*
    Request body expects:
    {
    	"username": <username>,
      "password": <password>
    }
    */
    // Returned JSON is the logged in user document
    // POST /users/login
    loginUser(req, res) {

        const username = req.body.username
        const password = req.body.password

        User.findByUserPassword(username, password).then((user) => {
            if(!user) {
                res.status(404).send("Username not found.")
                // res.redirect('/login')
            } else {
                if (user.is_banned) {
                    res.status(401).send("Sorry, you are banned from the site.")
                } else { // not banned
                  req.session.user = user._id;
                  req.session.email = user.email
                  user.password = "";
                  res.send(user)
                }
            }
        }).catch((error) => {
            res.status(401).send("Incorrect user/password combination.")
        })
    },

    /// Route for logging out a user
    // Returned JSON is "success" if logout successful
    // GET /logout
    logoutUser(req, res) {
      req.session.destroy((error) => {
    		if (error) {
    			res.status(500).send(error)
    		} else {
    			res.send("success")
    		}
    	})
    },

    /// Route for getting all users
    // Returned JSON list of user documents
    // GET /getAllUsers
    getAllUsers(req, res) {

        User.find().then((users) => {
                res.send( users ) // put in object in case we want to add other properties
            }, (error) => {
                res.status(400).send(error)
            })

    },

    /// Route for adding a show to a user's list of shows
    /*
    Request body expects:
    {
    	"showID": <show's ID>,
    }
    */
    // :id refers to user's ID
    // Returned JSON is the user document, including the new added show
    // POST /users/:id/addshow
    addShow(req, res) {

      const id = req.params.id

      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      User.findById(id).then((user) => {
        user.my_shows.push(req.body.showId);

        user.save().then((result) => {
          user.password = '';
          res.send(result);
        }, (error) => {
          res.status(400).send(error);
        });

      }, (error) => {
        res.status(400).send(error);
      })

    },

    /// Route for removing a show from a user's list of shows
    /*
    Request body expects:
    {
    	"showID": <show's ID>,
    }
    */
    // :id refers to user's ID
    // Returned JSON is the user document, with the show in question removed
    // POST /users/:id/removeshow
    removeShow(req, res) {

      const id = req.params.id

      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      User.findById(id).then((user) => {
        user.my_shows = user.my_shows.filter(showId => showId != req.body.showId);

        user.save().then((result) => {
          user.password = '';
          res.send(result);
        }, (error) => {
          res.status(400).send(error);
        });

      }, (error) => {
        res.status(400).send(error);
      })

    },

    /// Get user's list of shows
    // :id refers to user's ID
    // Returned JSON is a list of show IDs
    // POST /users/:id/getMyShows
    getMyShows(req, res) {

      const id = req.params.id

      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      User.findById(id, "my_shows").populate('my_shows').then((user) => {
        res.send(user.my_shows);

      }, (error) => {
        res.status(400).send(error);
      })

    },

    /// Get list of shows that are not in user's list of shows
    // :id refers to user's ID
    // Returned JSON is a list of show IDs
    // POST /users/:id/notMyShows
    getNotMyShows(req, res) {

      const id = req.params.id

      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      User.findById(id, "my_shows").populate('my_shows').then((user) => {
        Show.find({_id: {$nin: user.my_shows}, approved: true}).then((shows) => {
          res.send(shows);

        }, (error) => {
          res.status(400).send(error);
        })

      }, (error) => {
        res.status(400).send(error);
      })

    },

    /// Checks if show is in user's list of shows
    // :id refers to user's ID
    // :show_id refers to show's ID
    // Returns true if show is in user's list of shows, else return false
    // GET /users/:id/show/:show_id
    isMyShow(req, res) {

      const id = req.params.id
      const show_id = req.params.show_id
      // Good practice is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }
      if (!ObjectID.isValid(show_id)) { return res.status(404).send() }

      User.findById(id, "my_shows").populate('my_shows').then((user) => {
        for( show of user.my_shows){
          if(show._id == show_id ){
            res.status(200).send(true);
          }
        }
        res.status(200).send(false);
      }, (error) => {
        res.status(400).send(error);
      })

    },
};
