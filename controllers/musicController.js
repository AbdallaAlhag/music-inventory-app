const { getAllArtist } = require('../db/queries');
async function getArtist(req, res) {
    // const messages = await getAllArtist();
    // res.render('index', {
    //     title: 'Index!',
    // });
    try {
        // const artists = await getAllArtist(); // Fetch all artists from your model
        res.render('index', {
            title: 'Index!',
            // artists: artists // Pass the artists to the view if needed
        });
    } catch (error) {
        console.error('Error fetching artists:', error);
        res.status(500).send('Internal Server Error');
    }

}

module.exports = { getArtist };