var apicache = require("apicache");

//  Initialize apicache
var cache = apicache.middleware;
apicache.options({ debug: true });

//  Mongoose database schema
var Element = require("./models/element.js");

exports.viewAllElements = function(req, res) {
    req.apicacheGroup = "elements";

    Element.find(function(err, elements) {
        if (err) {
            res.send(err);
        }
        res.json(elements);
    });
};

exports.addElement = function(req, res) {
    apicache.clear("elements");

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
};

exports.viewElement = function(req, res) {
    req.apicacheGroup = req.params.element_id;

    Element.findById(req.params.element_id, function(err, element) {
        if (err) {
            res.send(err);
        }
        res.json(element);
    });
};

exports.updateElement = function(req, res) {
    apicache.clear(req.params.element_id);
    apicache.clear("elements");

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
};

exports.deleteElement = function(req, res) {
    apicache.clear(req.params.element_id);
    apicache.clear("elements");

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
};
