# HTML Reference API

An example of a REST API built with Express and MongoDB, for self-education. A lot of this was learned from the book
[Web Development with Node & Express](http://shop.oreilly.com/product/0636920032977.do) by Ethan Brown, and the article
[Build a RESTful API Using Node and Express 4](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
by Chris Sevilleja.

This simply returns JSON; for the associated front-end client, check out
[html-reference-webapp](https://github.com/stevecochrane/html-reference-webapp). Currently it's used to store data on
HTML elements (html, head, body, etc.) though the only data stored at the moment is a name and description for each
element.

### Setup

If you want to run this locally you'll need a MongoDB database. I used a free sandbox database hosted on
[mLab](https://mlab.com/), but anything starting with `mongodb://` should work fine, probably. The app expects there to
 be a `credentials.js` file in the base directory with MongoDB URLs, like this:

```javascript
module.exports = {
    mongo: {
        development: {
            connectionString: "mongodb://<your-mongodb-instance>"
        },
        production: {
            connectionString: "mongodb://<your-mongodb-instance>"
        }
    }
};
```

Once you've added that, and assuming you already have [Node](https://nodejs.org/) installed, navigate to the base
directory with a command line interface and do this:

```bash
npm install
gulp
```

That will start the API server, and the main `html-reference-api.js` file will also be watched for changes. When
any changes are saved, the [Mocha](http://mochajs.org/) test suite will run to test those changes. The test suite can
also be run manually (assuming the API server is already running) from the project root directory like so, if you have
Mocha globally installed:

```bash
mocha tests
```

### Supported Routes

Once the application is running, the following routes are available:

| Route                    | Request Method | Action                    |
| ------------------------ | -------------- | ------------------------- |
| /api/elements            | GET            | View all elements         |
| /api/elements            | POST           | Add a new element         |
| /api/element/:element_id | GET            | View a specific element   |
| /api/element/:element_id | PUT            | Update a specific element |
| /api/element/:element_id | DELETE         | Delete a specific element |
