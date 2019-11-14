const { Show } = require('../models/show')
const { ObjectID } = require('mongodb')

module.exports = {

    /// Route for creating a new show
    /*
    Request body expects:
    {
      "title": <show title>,
      "description": <show description>,
      "airDate": <show's air date>,
      "img": <display image for show>,
      "link": <link to show online>,
      "airInterval": <number of days between new episode release>,
      "approved": <if show is approved>,
      "updating": <id of show it will replace once approved>
    }
    */
    // Returned JSON is the newly created show document
    // POST /shows
    create(req, res) {
        console.log(req.body)

        // create a new show
        const show = new Show({
            title: req.body.title,
            description: req.body.description,
            airDate: new Date(req.body.airDate),
            img: req.body.img,
            link: req.body.link,
            airInterval: req.body.airInterval,
            approved: req.body.approved,
            updating: req.body.updating,
        })

        // save show to database
        show.save().then((result) => {
            res.send(show);
          }, (error) => {
            res.status(400).send(error); // 400 for bad request
          })
    },

    /// Route for getting all approved shows
    // Returned JSON is an array of approved shows
    // GET /shows/approved
    getApprovedShows(req, res) {

        Show.find({approved: true}).then((shows) => {
            res.send(shows); // put in object in case we want to add other properties
          }, (error) => {
            res.status(400).send(error);
          })

    },

    /// Route for getting all unapproved shows
    // Returned JSON is an array of unapproved shows
    // GET /shows/unapproved
    getUnapprovedShows(req, res) {

        Show.find({approved: false}).then((shows) => {
            res.send(shows); // put in object in case we want to add other properties
          }, (error) => {
            res.status(400).send(error);
          })

    },

    /// Route for removing a show
    /*
    Request body expects:
    {
      "showId": <show ID>
    }
    */
    // Returned JSON is removed show document
    // POST /shows/remove
    removeShow(req, res) {

      Show.findByIdAndRemove(req.body.showId).then((shows) => {
          res.send(shows); // put in object in case we want to add other properties
        }, (error) => {
          res.status(400).send(error);
        })

    },

    /// Route for changing a show's status to approved (show.approved = true)
    /*
    Request body expects:
    {
      "showId": <show ID>
    }
    */
    // Returned JSON is approved show document
    // POST /shows/approve
    approveShow(req, res) {

      Show.findById(req.body.showId).then((show) => {
          show.approved = true;
          show.save().then((result) => {
            res.send(result);
          }, (error) => {
            res.status(400).send(error);
          });

        }, (error) => {
          res.status(400).send(error);
        })

    },

    /// Route for approving a show and deleting the copy holding information
		/// to be copied into the approved show. The show ID here refers to the
		/// show whose information we want to copy into the approved show, which is
		/// also the unapproved copy that we want to delete.
    /*
    Request body expects:
    {
      "showId": <show ID>
    }
    */
    // Returned JSON is approved show document
    // POST /shows/approveAndDelete
    approveAndDeleteShow(req, res) {

      Show.findByIdAndDelete(req.body.showId).then((show) => {
          console.log(show);

          Show.findById(show.updating).then((updatedShow) => {

            // update show parameters
            updatedShow.title = show.title;
            updatedShow.description = show.description;
            // do not update approved parameter -- should be true already in updatedShow
            updatedShow.img = (show.img) ? show.img : show.img;
            updatedShow.link = (show.link) ? show.link : show.link;
            updatedShow.airDate = (show.airDate) ? show.airDate : show.airDate;
            updatedShow.airInterval = (show.airInterval) ? show.airInterval : show.airInterval;
            // do not update updating parameter -- should still be null

            updatedShow.save().then((result) => {
              res.send(result);
            }, (error) => {
              res.status(400).send(error);
            });

          }, (error) => {
            res.status(400).send(error);
          })

        }, (error) => {
          res.status(400).send(error);
        })

    },

    /// Route for getting a single show based on the show's ID
    // :id refers to user's ID
    // Returned JSON is the show document
    // GET /shows/:id
    getShow(req, res) {

        const id = req.params.id

        // Good practise is to validate the id
        if (!ObjectID.isValid(id)) { return res.status(404).send() }

        // Otheriwse, findById
        Show.findById(id).then((show) => {
          if (!show) {
            res.status(404).send();
          } else {
            res.send( show );
          }

        }).catch((error) => {
            res.status(400).send(error);
        })
    },

    /// Route for editing an existing show
    /*
    Request body expects:
    {
      "title": <show title>,
      "description": <show description>,
      "airDate": <show's air date>,
      "img": <display image for show>,
      "link": <link to show online>,
      "airInterval": <number of days between new episode release>,
      "approved": <if show is approved>,
    }
    */
    // :id refers to user's ID
    // Returned JSON is the updated show document
    // POST /shows/:id/edit
    editShow(req, res) {

      const id = req.params.id

      // Good practise is to validate the id
      if (!ObjectID.isValid(id)) { return res.status(404).send() }

      // Otheriwse, findById
      Show.findById(id).then((show) => {
        if (!show) {
          res.status(404).send();
        } else {

          // update show parameters
          show.title = req.body.title;
          show.description = req.body.description;
          show.approved = req.body.approved;
          show.img = (req.body.img) ? req.body.img : show.img;
          show.link = (req.body.link) ? req.body.link : show.link;
          show.airDate = (req.body.airDate) ? req.body.airDate : show.airDate;
          show.airInterval = (req.body.airInterval) ? req.body.airInterval : show.airInterval;

          // save show
          show.save().then((result) => {
              res.send(show);
            }, (error) => {
              res.status(400).send(error); // 400 for bad request
            });
        }

      }).catch((error) => {
          res.status(400).send(error);
      })

    }
};
