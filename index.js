const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('crud operation running');

})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}.f6zv1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
        await client.connect();
        const usersCollection = client.db("bikeExpress").collection("users");
        const user = { name: "ontor", email: "ontor@gmail.com" };
        const result = await usersCollection.insertOne(user);
        console.log(`User inserted with id:${result.insertedId}`);

    }
    finally {

        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('listening on port', port);

});