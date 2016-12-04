var apicache = require("apicache");
var express  = require("express");
var router   = express.Router();

var elements = require("./elements.js");

//  Initialize apicache
var cache = apicache.middleware;
apicache.options({ debug: true });

router.route("/elements")

    //  View all elements (accessed with GET at http://localhost:3000/api/elements)
    .get(cache("5 minutes"), elements.viewAllElements)

    //  Add a new element (accessed with POST at http://localhost:3000/api/elements)
    .post(elements.addElement);

router.route("/element/:element_id")

    //  View a specific element (accessed with GET at http://localhost:3000/api/elements/:element_id)
    .get(elements.viewElement)

    //  Update a specific element (accessed with PUT at http://localhost:3000/api/elements/:element_id)
    .put(elements.updateElement)

    //  Delete a specific element (accessed with DELETE at http://localhost:3000/api/elements/:element_id)
    .delete(elements.deleteElement);

module.exports = router;
