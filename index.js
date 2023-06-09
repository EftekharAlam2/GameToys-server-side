const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v1phe5i.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const toyCollection = client.db("videoGamingToys").collection("toysData");

    app.post("/toys", async (req, res) => {
      const toys = req.body;
      const result = await toyCollection.insertOne(toys);
      res.send(result);
    });

    app.get("/toys", async (req, res) => {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 20;
      const skip = page * limit;

      const searchQuery = req.query.searchQuery || "";

      const result = await toyCollection
        .find({ toyName: { $regex: searchQuery, $options: "i" } })
        .skip(skip)
        .limit(limit)
        .toArray();
      res.send(result);
    });

    app.get("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await toyCollection.findOne(query);
      res.send(result);
    });

    app.get("/totalToys", async (req, res) => {
      const result = await toyCollection.estimatedDocumentCount();
      res.send({ totalToys: result });
    });

    app.get("/toys/email/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };

      const result = await toyCollection
        .find(query)
        .sort({ price: 1 })
        .toArray();
      res.send(result);
    });

    app.put("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedToy = req.body;

      const coffee = {
        $set: {
          price: updatedToy.price,
          quantity: updatedToy.quantity,
          description: updatedToy.description,
        },
      };

      const result = await toyCollection.updateOne(filter, coffee, options);
      res.send(result);
    });

    app.delete("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toyCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The server is running");
});

app.listen(port, () => {
  console.log(`The Server is running on port ${port}`);
});
