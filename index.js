const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f6zv1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors());
app.use(express.json());

async function run() {

    try {
        await client.connect();
        const usersCollection = client.db("bikeExpress").collection("users");

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.findOne(query);
            res.send(result);
        })

        app.put('/services/:id', async (req, res) => {
            const id = req.params.id;
            const updatedService = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    Name: updatedService.Name,
                    Price: updatedService.Price,
                    Details: updatedService.Details,
                    Quantity: updatedService.Quantity,
                    Supplier: updatedService.Supplier,
                    img: updatedService.img
                }
            };
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        });

        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });

        app.post('/services', async (req, res) => {
            const newItem = req.body;
            const result = await usersCollection.insertOne(newItem);
            res.send(result);
        })
    }
    finally {

        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('crud operation running');

})

app.listen(port, () => {
    console.log('listening to port', port);

});