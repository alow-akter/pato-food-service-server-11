const express = require('express')
const app = express()
const cors = require('cors')
const port = 5001
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://pato-food-service:bgPDI0C54Suc14ly@cluster0.sduwbrc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const foodCollection = client.db('FoodDatabase').collection('FoodService')

        app.get('/food', async (req, res) => {
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