const Data = require('../model/exoplanet');
const csv = require('csvtojson');

const importuser = async (req, res) => {
    try {
        const user_data = [];
        csv().fromFile(req.file.path).then(async (response) => {
            for (let x = 0; x < response.length; x++) {
                user_data.push({
                    pl_name: response[x].pl_name,
                    hostname: response[x].hostname,
                    sy_snum: response[x].sy_snum,
                    sy_pnum: response[x].sy_pnum,
                    discoverymethod: response[x].discoverymethod,
                    disc_year: response[x].disc_year,
                    disc_facility: response[x].disc_facility,
                    pl_orbper: response[x].pl_orbper,
                    pl_orbpererr1: response[x].pl_orbpererr1,
                    pl_orbpererr2: response[x].pl_orbpererr2,
                    pl_orbperlim: response[x].pl_orbperlim,
                    pl_pubdate: response[x].pl_pubdate,
                });
            }
            await Data.insertMany(user_data);
            res.status(200).json({ success: true, message: 'Data imported successfully' });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { importuser };
