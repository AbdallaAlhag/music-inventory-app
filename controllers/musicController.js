const { getHomePageInfo } = require('../db/queries');
const moment = require('moment');
async function getHomePage(req, res) {

    try {
        const recentAlbums = await getHomePageInfo();
        console.log(recentAlbums);
        res.render('index', {
            title: 'Index!',
            recentlyAddedAlbums: recentAlbums,
            moment: moment,
        });
    } catch (error) {
        console.error('Error fetching artists:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getHomePage };