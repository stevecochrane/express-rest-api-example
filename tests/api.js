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
        it("Should be able to create a new element", function(done) {
            restler.post(baseUrl + "/api/elements", { "data": testElement }).on("success", function(data) {
                assert.isDefined(data.element._id, "The new element's ID is defined");
                done();
            });
        });
    });

    describe("Read", function() {
        it("Should be able to read an existing element", function(done) {
            restler.post(baseUrl + "/api/elements", { "data": testElement }).on("success", function(data) {
                assert.isDefined(data.element._id, "The new element's ID is defined");
                restler.get(baseUrl + "/api/element/" + data.element._id).on("success", function(data) {
                    assert(data.element.name === testElement.name, "New element name is consistent with what was submitted");
                    assert(data.element.description === testElement.description, "New element description is consistent with what was submitted");
                    done();
                });
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
