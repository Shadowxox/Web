const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const client = new MongoClient(process.env.MONGO_URL);

app.get("/waifus", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("hinata_waifu");
    const data = await db.collection("waifus").find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Server running"));