require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.EXPRESS_PORT || 5000;

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.pwfe9mm.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();

    app.post("/coffee", (req, res) => {
      const newCoffee = req.body;
      console.log(newCoffee);
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

// Middleware
app.use(cors());
app.use(express.json());

//Endpoints
app.get("/", (req, res) => {
  res.send("Coffe Making server is running");
});

app.listen(port, () => {
  console.log(`Coffe server is running on port: ${port}`);
});
