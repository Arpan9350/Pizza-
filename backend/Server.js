const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const PORT = 5000;
const app = express();
const catModal=require('./db/createSchema');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const postRoutes=require('./routes/postRoutes')
app.use("/api/posts",postRoutes)



const db = "mongodb://localhost:27017/pizza";
const connectdb = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true })
        console.log("mongo connected");
    }
    catch (err) {
        console.log(err.message)
    }

}
connectdb();


app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`wolring on ${PORT}`)
})