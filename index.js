
const express = require('express')
var cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
// middleware
 app.use(cors())
 app.use(express.json())


// mongodb connect

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ajoy.0ptrrqh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const skillsCollection=client.db('portfolio').collection('skills')
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
   app.get('/skills',async(req,res)=>{
    const result=await skillsCollection.find().toArray();
    res.send(result)
   })

   app.get('/frontend',async(req,res)=>{
    const query={category:'FrontEnd'};
    const result=await skillsCollection.find(query).toArray();
    res.send(result)
   })
   app.get('/backend',async(req,res)=>{
    const query={category:'BackEnd'};
    const result=await skillsCollection.find(query).toArray();
    res.send(result)
   })
   app.get('/tools',async(req,res)=>{
    const query={category:'Tools'};
    const result=await skillsCollection.find(query).toArray();
    res.send(result)
   })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})