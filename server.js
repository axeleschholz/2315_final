const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL =
  "mongodb://mongodb://ubmm8wsjyz30hhcsinm2:XSNioWk3sKa2K9f0TVUR@ble9ddg2vn3ijr8-mongodb.services.clever-cloud.com:27017/ble9ddg2vn3ijr8:WvdzcfnOdCajxYzvpbSI@bnsp132kjcfnyw1-mongodb.services.clever-cloud.com:27017/bnsp132kjcfnyw1";
const DATABASE_NAME = "ble9ddg2vn3ijr8";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var database, collection;

//GET customers
app.get("/api/customers", (req, res) => {
  database
    .collection("customer")
    .find({})
    .toArray((error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result);
    });
});

//GET customer
app.get("/api/customers/:id", (req, res) => {
  var id = String(req.params.id);

  collection.findOne({ customer_id: id }, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
});

//POST customer
app.post("/api/customers", (req, res) => {
  database.collection("customer").insert(req.body, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result.result);
  });
});

//PUT customer
app.put("/api/customers/:id", (req, res) => {
  var id = String(req.params.id);

  var myquery = { customer_id: id };
  var newvalues = { $set: req.body };
  database
    .collection("customer")
    .updateOne(myquery, newvalues, function (error, result) {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result.result);
    });
});

//DELETE customer
app.delete("/api/customers/:id", (req, res) => {
  var id = String(req.params.id);

  var myquery = { customer_id: id };
  collection.deleteOne(myquery, function (error, result) {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result.result);
  });
});

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
      console.log("Connected to `" + DATABASE_NAME + "`!");
      console.log(
        "Listening on localhost:5000, try http://localhost:5000/api/customers"
      );
    }
  );
});
