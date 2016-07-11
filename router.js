var express = require("express");
var router  = express.Router();

var api = require("./api.js");

router.route("/elements")

    //  View all elements (accessed with GET at http://localhost:3000/api/elements)
    .get(api.viewAllElements)

    //  Add a new element (accessed with POST at http://localhost:3000/api/elements)
    .post(api.addElement);

router.route("/element/:element_id")

    //  View a specific element (accessed with GET at http://localhost:3000/api/elements/:element_id)
    .get(api.viewElement)

    //  Update a specific element (accessed with PUT at http://localhost:3000/api/elements/:element_id)
    .put(api.updateElement)

    //  Delete a specific element (accessed with DELETE at http://localhost:3000/api/elements/:element_id)
    .delete(api.deleteElement);

module.exports = router;
