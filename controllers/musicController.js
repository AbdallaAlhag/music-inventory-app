const { getHomePageInfo, getCategoryInfo, getDetailInfo } = require('../db/queries');
const moment = require('moment');
async function getHomePage(req, res) {

    try {
        const recentAlbums = await getHomePageInfo();
        // console.log(recentAlbums);
        res.render('index', {
            title: 'Recently Released Albums',
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
        const { gatheredInventory, currentType } = await getCategoryInfo(type);

        res.render('category', {
            title: type,
            inventory: gatheredInventory,
            moment: moment,
            currentType: currentType,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getDetail = async (req, res) => {
    const details = req.params.detail;
    console.log('details:', details);
    const [id, Currenttype] = details.split('-');
    console.log('id:', id, 'Currenttype:', Currenttype);
    try {
        const result = await getDetailInfo(id, Currenttype);
        res.render('detail', {
            title: 'detail',
            type: result,
            moment: moment,
            currentType: Currenttype
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getHomePage, getCategory, getDetail };