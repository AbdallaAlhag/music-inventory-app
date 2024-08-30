const { getHomePageInfo } = require('../db/queries');
async function getHomePage(req, res) {

    try {
        const recentAlbums = await getHomePageInfo();
        console.log(recentAlbums);
        res.render('index', {
            title: 'Index!',
            recentlyAddedAlbums: recentAlbums,
        });
    } catch (error) {
        console.error('Error fetching artists:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getHomePage };