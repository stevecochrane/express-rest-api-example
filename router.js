var express = require("express");
var router  = express.Router();

//  Mongoose database schema
var Element = require("./models/element.js");

//  For routes ending with "/elements"
router.route("/elements")

    //  View all elements (accessed with GET at http://localhost:3000/api/elements)
    .get(function(req, res) {
        Element.find(function(err, elements) {
            if (err) {
                res.send(err);
            }
            res.json(elements);
        });
    })

    //  Add a new element (accessed with POST at http://localhost:3000/api/elements)
    .post(function(req, res) {
        var element = new Element();
        element.name = req.body.name;
        element.description = req.body.description;

        element.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({
                "message": "Element created!",
                "element": element
            });
        });
    });

//  For routes ending with "/elements/:element_id"
router.route("/element/:element_id")

    //  View a specific element (accessed with GET at http://localhost:3000/api/elements/:element_id)
    .get(function(req, res) {
        Element.findById(req.params.element_id, function(err, element) {
            if (err) {
                res.send(err);
            }
            res.json(element);
        });
    })

    //  Update a specific element (accessed with PUT at http://localhost:3000/api/elements/:element_id)
    .put(function(req, res) {
        Element.findById(req.params.element_id, function(err, element) {
            if (err) {
                res.send(err);
            }

            element.name = req.body.name;
            element.description = req.body.description;

            element.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    "message": "Element updated!",
                    "element": element
                });
            });
        });
    })

    //  Delete a specific element (accessed with DELETE at http://localhost:3000/api/elements/:element_id)
    .delete(function(req, res) {
        Element.remove({
            "_id": req.params.element_id
        }, function(err, element) {
            if (err) {
                res.send(err);
            }
            res.json({
                "message": "Element deleted!"
            });
        });
    });

module.exports = router;
