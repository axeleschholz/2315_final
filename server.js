const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const CONNECTION_URL =
  "mongodb://ubmm8wsjyz30hhcsinm2:XSNioWk3sKa2K9f0TVUR@ble9ddg2vn3ijr8-mongodb.services.clever-cloud.com:27017/ble9ddg2vn3ijr8";
const DATABASE_NAME = "ble9ddg2vn3ijr8";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var database, collection;

//GET books
app.get("/api/books", (req, res) => {
  var filter = "$natural";
  if (req.query.filter) {
    filter = req.query.filter;
  }
  var order = 1;
  if (req.query.order) {
    order = req.query.order;
  }
  collection
    .find({})
    .sort({ [filter]: order })
    .toArray((error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result);
    });
});

//GET book
app.get("/api/books/:id", (req, res) => {
  var id = Number(req.params.id);

  collection.findOne({ bookID: id }, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
});

function getNextSequence(sequenceName) {
  //References and updates a counter document to keep track of available IDs
  return increment
    .findOneAndUpdate(
      { name: sequenceName },
      { $inc: { sequence_value: 1 } },
      { returnNewDocument: true }
    )
    .then((updatedDocument) => {
      return updatedDocument.value.sequence_value;
    })
    .catch((err) =>
      console.error(`Failed to find and update document: ${err}`)
    );
}

//POST book
app.post("/api/books", async (req, res) => {
  //retrieve the next available book and add that to the post body
  req.body["bookID"] = await getNextSequence("bookID");

  collection.insert(req.body, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result.result);
  });
});

//PUT book
app.put("/api/books/:id", (req, res) => {
  var id = Number(req.params.id);
  delete req.body._id;
  var myquery = { bookID: id };
  var newvalues = { $set: req.body };

  collection.updateOne(myquery, newvalues, function (error, result) {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
});

//DELETE book
app.delete("/api/books/:id", (req, res) => {
  var id = Number(req.params.id);

  var myquery = { bookID: id };
  collection.deleteOne(myquery, function (error, result) {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result.result);
  });
});

//Initialized
app.listen(5000, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("books");
      increment = database.collection("other");
      console.log("Connected to `" + DATABASE_NAME + "`!");
      console.log(
        "Listening on localhost:5000, try http://localhost:5000/api/books"
      );
    }
  );
});
