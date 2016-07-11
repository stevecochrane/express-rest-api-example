var express = require("express");
var router  = express.Router();

var controller = require("./controller.js");

//  For routes ending with "/elements"
router.route("/elements")

    //  View all elements (accessed with GET at http://localhost:3000/api/elements)
    .get(controller.viewAllElements)

    //  Add a new element (accessed with POST at http://localhost:3000/api/elements)
    .post(controller.addElement);

//  For routes ending with "/elements/:element_id"
router.route("/element/:element_id")

    //  View a specific element (accessed with GET at http://localhost:3000/api/elements/:element_id)
    .get(controller.viewElement)

    //  Update a specific element (accessed with PUT at http://localhost:3000/api/elements/:element_id)
    .put(controller.updateElement)

    //  Delete a specific element (accessed with DELETE at http://localhost:3000/api/elements/:element_id)
    .delete(controller.deleteElement);

module.exports = router;
