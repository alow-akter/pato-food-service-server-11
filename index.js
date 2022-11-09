const express = require('express')
const app = express()
const cors = require('cors')
const port = 5001
const { MongoClient, ServerApiVersion } = require('mongodb');


//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://pato-food-service:bgPDI0C54Suc14ly@cluster0.sduwbrc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
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