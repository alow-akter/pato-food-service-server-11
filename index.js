const express = require('express')
const app = express()
const cors = require('cors')
const port = 5001
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


//middleware
app.use(cors())
app.use(express.json())



//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sduwbrc.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sduwbrc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const foodCollection = client.db('FoodDatabase').collection('FoodService')

        const reviewCollection = client.db('FoodDatabase').collection('reviews')

        app.get('/food', async (req, res) => {
            const query = {}
            const cursor = foodCollection.find(query)
            const foods = await cursor.toArray()
            res.send(foods)
        })
        app.post('/foodService', async (req, res) => {
            const foods = req.body;
            const result = await foodCollection.insertOne(foods)
            res.send(result)
        })

        app.get('/foodService', async (req, res) => {

            const query = {}
            const cursor = foodCollection.find(query)
            const foods = await cursor.toArray()
            res.send(foods)
        })

        app.get('/threeCurd', async (req, res) => {
            const query = {}
            const cursor = foodCollection.find(query)
            const threeData = await cursor.limit(3).toArray()
            res.send(threeData)
        })
        app.get('/food/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const curds = await foodCollection.findOne(query)
            res.send(curds)
        })

        //review api
        app.get(`/reviewsById`, async (req, res) => {
            let query = {};
            if (req.query.food) {
                query = {
                    food: req.query.food,
                };
            }
            const searchService = await reviewCollection.find(query).toArray();

            res.send(searchService);
        });

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review)
            res.send(result)
        })
        app.get('/reviewsByEmail', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query)
            const myReview = await cursor.toArray()
            console.log(myReview)
            res.send(myReview)
        })
    }

    finally {

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello from pato food service curd ')
})

app.listen(port, () => {
    console.log(`listen to port ${port}`)
})