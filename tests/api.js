var assert  = require("chai").assert;
var http    = require("http");
var restler = require("restler");

describe("Element API", function() {

    var testElement = {
        "name": "test",
        "description": "This is a element added by the API Test suite."
    };

    var baseUrl = "http://localhost:3000";

    describe("Create", function() {
        var newElement;

        it("Should be able to create a new element", function(done) {
            restler.post(baseUrl + "/api/elements", { "data": testElement }).on("complete", function(result, response) {
                if (result instanceof Error) {
                    console.log("Error: ", result.message);
                }
                newElement = result.element;
                assert.isDefined(newElement._id, "The new element's ID is defined");
                done();
            });
        });

        after("Tear down by deleting the new test element", function() {
            restler.del(baseUrl + "/api/elements/" + newElement._id).on("complete", function(result, response) {
                if (result instanceof Error) {
                    console.log("Error: ", result.message);
                }
            });
        });
    });

    describe("Read", function() {
        var newElement;

        before("Set up by creating a new element for this test", function(done) {
            restler.post(baseUrl + "/api/elements", { "data": testElement }).on("complete", function(result, response) {
                if (result instanceof Error) {
                    console.log("Error: ", result.message);
                }
                newElement = result.element;
                done();
            });
        });

        it("Should be able to read an existing element", function(done) {
            restler.get(baseUrl + "/api/elements/" + newElement._id).on("complete", function(result, response) {
                if (result instanceof Error) {
                    console.log("Error: ", result.message);
                }
                assert(result.name === newElement.name, "New element name is consistent with what was submitted");
                assert(result.description === newElement.description, "New element description is consistent with what was submitted");
                done();
            });
        });

        after("Tear down by deleting the new test element", function() {
            restler.del(baseUrl + "/api/elements/" + newElement._id).on("complete", function(result, response) {
                if (result instanceof Error) {
                    console.log("Error: ", result.message);
                }
            });
        });
    });

    describe("Update", function() {
        it("Should be able to update an existing element");
    });

    describe("Delete", function() {
        it("Should be able to delete an element");
    });

});
