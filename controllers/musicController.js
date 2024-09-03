const { getHomePageInfo, getCategoryInfo, getDetailInfo, insertIntoDatabase, getDropdownData, updateDatabase, deleteDatabase } = require('../db/queries');
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
        // console.log(gatheredInventory)
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
    // console.log('details:', details);
    const [id, Currenttype] = details.split('-');
    // console.log('id:', id, 'Currenttype:', Currenttype);
    try {
        const result = await getDetailInfo(id, Currenttype);
        console.log(result)
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
// Controller to handle rendering the form for a new message
async function getCreatePage(req, res) {
    const type = req.params.type;
    const dropdownData = await getDropdownData();
    res.render('create', { title: 'Create', type, dropdownData });
}

async function createNewObject(req, res) {
    const type = req.params.type; // Assuming 'create' is the correct route parameter name
    // console.log(type)
    const values = req.body; // Extract the form data directly from req.body


    try {
        const insertedData = await insertIntoDatabase(type, values); // Call the insert function
        // console.log('Inserted data:', insertedData);
        res.redirect('/'); // Redirect to the home page after successful insertion
    } catch (error) {
        console.error('Error creating new object:', error);
        res.status(500).send('Internal Server Error');
    }

}

async function getUpdatePage(req, res) {
    const { type, id } = req.params;

    try {
        const currentData = await getDetailInfo(id, type); // Fetch the current data from the database
        // console.log('type:', type, 'id:', id);
        // console.log("currentData:", currentData[0]);
        if (type == 'Albums') {
            const dropdownData = await getDropdownData();
            // console.log(dropdownData);
            res.render('update', { type, title: 'Update', currentData: currentData[0], dropdownData, moment });
        } else {
            res.render('update', { type, title: 'Update', currentData: currentData[0], moment });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};

async function updateObject(req, res) {
    const { type, id } = req.params;
    const updatedData = req.body; // The updated data from the form
    console.log("type:", type, "id:", id, 'updatedData:', updatedData);
    try {
        await updateDatabase(id, type, updatedData); // Update the data in the database
        res.redirect('/');
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteObject(req, res) {
    const { type, id } = req.params;
    // console.log('hi', type, id);
    try {
        await deleteDatabase(id, type) // delete the data in the database
        res.redirect('/');
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { getHomePage, getCategory, getDetail, createNewObject, getCreatePage, getUpdatePage, updateObject, deleteObject };