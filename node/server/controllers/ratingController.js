const User = require('../models/user').User
const Show = require('../models/show').Show
const { Rating } = require('../models/rating')
const { ObjectID } = require('mongodb')

module.exports = {

    /// Route for creating a new rating
    /*
    Request body expects:
    {
      "show_id": <ID of reviewed show>,
      "user_id": <ID of user making review>,
      "rating": <user rating>,
      "status": <user status>,
      "review": <review>
    }
    */
    // Returned JSON is the newly created rating document
    // POST /rating
    create(req, res) {
        console.log(req.body)
        Rating.findOneAndUpdate({show_id:req.body.show_id, user_id: req.body.user_id},{$set:req.body}, {upsert: true}).then((result) => {
              res.send(req.body)
            }, (error) => {
              res.status(400).send(error) // 400 for bad request
        })
    },

    /// Route for getting all ratings
    // Returned JSON is an array of all ratings
    // GET /rating
    getAllRatings(req, res) {

        Rating.find().then((result) => {
                res.send( result ) // put in object in case we want to add other properties
            }, (error) => {
                res.status(400).send(error)
            })

    },

    /// Route for getting user's rating for show
    // :user_id refers to user's ID
    // :show_id refers to show's ID
    // Returned JSON is the rating document
    // GET /rating/status/:user_id/:show_id
    getMyRating(req, res) {
        Rating.find({show_id: req.params.show_id, user_id: req.params.user_id}).then((result) => {
                res.send( result ) // put in object in case we want to add other properties
            }, (error) => {
                res.status(400).send(error)
            })
    },

    /// Route for getting average rating for show
    // :show_id refers to show's ID
    // Returned is a number representing averge show rating
    // GET /rating/avg/:show_id
    getAvgRating(req, res) {
      Rating.aggregate([{$group:
        {_id:
          {show_id:"$show_id"},
          count:{$sum: 1},
          avg:{$avg: "$rating"}
        }
      }]).then((results) => {
              filtered = results.filter(result => result._id.show_id == req.params.show_id )
              res.send( filtered )
          }, (error) => {
              res.status(400).send(error)
          })
    },

    /// Route for getting number of ratings for a show
    // :show_id refers to show's ID
    // Returned is a number representing total number of ratings for a show
    // GET /rating/status/:show_id
    numberofStatus(req, res) {
      Rating.aggregate([{$group:
        {_id:
          {status:"$status", show_id:"$show_id"},
          count:{$sum: 1},
          avg:{$avg: "$rating"}
        }
      }]).then((results) => {
              filtered = results.filter(result => result._id.show_id == req.params.show_id )
              res.send( filtered )
          }, (error) => {
              res.status(400).send(error)
          })

    },

    /// Route for getting all reviews for a show
    // :show_id refers to show's ID
    // Returned JSON is an array of reviews for a show
    // GET /rating/status/:show_id
    getReviews(req, res) {
      const showId = req.params.show_id

      // Good practice is to validate the id
      if (!ObjectID.isValid(showId)) { return res.status(404).send([]) }

      Rating.find({show_id: req.params.show_id}).populate("user_id", "username").then((results) => {
              results.filter(result => result.review != undefined && result.review.length >= 1 )
              res.send( results )
          }, (error) => {
              res.status(400).send(error)
          })

    },

};
