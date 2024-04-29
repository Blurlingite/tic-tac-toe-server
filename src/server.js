const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://Nettles:1111@unbeatabletictactoeclus.kwq3wwi.mongodb.net/?retryWrites=true&w=majority&appName=UnbeatableTicTacToeCluster";
const app = express();
const PORT = 3002;

// Serve static files from the 'public' folder in src folder
app.use(express.static('src/public'));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB and fetch game data
// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB!");

//     const database = client.db("tictactoeAIWins");
//     const collection = database.collection("AIWins");
//     const documents = await collection.find({}).toArray();
//     console.log("Documents in AIWins collection:", documents);
//   } catch (error) {
//     console.error("Error fetching game data:", error);
//   } finally {
//     await client.close();
//   }
// }

// Connect to MongoDB when the server starts
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

// Fetch game data from MongoDB
async function fetchGameData() {
  try {
    const database = client.db("tictactoeAIWins");
    const collection = database.collection("AIWins");
    const gameData = await collection.findOne();
    return gameData;
  } catch (error) {
    console.error("Error fetching game data:", error);
    throw error; // Propagate the error to the caller
  }
}

// Define a route to fetch game data
app.get('/api/gameData', async (req, res) => {
  try {
    const gameData = await fetchGameData();
    res.json(gameData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game data" });
  }
});


// Start the server after connecting to MongoDB
async function startServer() {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Start the server
startServer();
