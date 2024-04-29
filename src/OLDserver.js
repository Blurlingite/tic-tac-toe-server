
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Nettles:1111@unbeatabletictactoeclus.kwq3wwi.mongodb.net/?retryWrites=true&w=majority&appName=UnbeatableTicTacToeCluster";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
  // try {
  //   // Connect the client to the server	(optional starting in v4.7)
  //   await client.connect();
  //   // Send a ping to confirm a successful connection
  //   await client.db("admin").command({ ping: 1 });
  //   console.log("Pinged your deployment. You successfully connected to MongoDB!");
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }

// }

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");
    
    // Access the tictactoeAIWins database
    const database = client.db("tictactoeAIWins");
    
    // Access the AIWins collection
    const collection = database.collection("AIWins");
    
    // Example: find all documents in the AIWins collection
    const documents = await collection.find({}).toArray();
    console.log("Documents in AIWins collection:", documents);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

