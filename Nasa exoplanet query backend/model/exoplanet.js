const mongoose = require('mongoose')
const exoplanetSchema  = new mongoose.Schema({
    pl_name:{
        type: String
    },
    hostname:{
        type: String
    },
    sy_snum: {
        type: Number
    },
    sy_pnum: {
        type: Number
    },
    discoverymethod:{
        type:String
    },
    disc_year:{
        type: Number
    },
    disc_facility:{
        type: String
    },
    pl_orbper:{
        type: Number
    },
    pl_orbpererr1:{
        type: Number
    },
    pl_orbpererr2:{
        type: Number
    },
    pl_orbperlim:{
        type: Number
    },
    pl_pubdate:{
        type: String
    }
});

module.exports = exoplanetSchema;
