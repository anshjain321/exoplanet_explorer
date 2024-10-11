const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const exoplanetSchema = require('./model/exoplanet');
const app = express();
const port = 3002;

app.use(cors(
    {
        origin: ["https://exoplanet-explorer-one.vercel.app/"],
        methods: ['get','post'],
        credentials: true
    }
));

mongoose.connect('mongodb+srv://jansh311:welcome123@exoplanetexplorer.xpnla.mongodb.net/');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

const Exoplanet = mongoose.model('Exoplanet', exoplanetSchema);

app.get('/api/data', async (req, res) => {
    try {
        const data = await Exoplanet.find().lean();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
