const { getHomePageInfo, getCategoryInfo } = require('../db/queries');
const moment = require('moment');
async function getHomePage(req, res) {

    try {
        const recentAlbums = await getHomePageInfo();
        // console.log(recentAlbums);
        res.render('index', {
            title: 'Index!',
            inventory: recentAlbums,
            moment: moment,
        });
    } catch (error) {
        console.error('Error fetching artists:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getCategory = async (req, res) => {
    const type = req.params.category;

    try {
        const gatheredInventory = await getCategoryInfo(type);
        // console.log(recentAlbums);
        res.render('index', {
            title: type,
            inventory: gatheredInventory,
            moment: moment,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getHomePage, getCategory };