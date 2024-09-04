const {
    getHomePageInfo,
    getCategoryInfo,
    getDetailInfo,
    insertIntoDatabase,
    getDropdownData,
    updateDatabase,
    deleteDatabase
} = require('../db/queries');
const moment = require('moment');
const { body, param, validationResult } = require("express-validator");

async function getHomePage(req, res) {
    try {
        const recentAlbums = await getHomePageInfo();
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
    const [id, Currenttype] = details.split('-');

    try {
        const result = await getDetailInfo(id, Currenttype);
        res.render('detail', {
            title: 'Detail',
            type: result,
            moment: moment,
            currentType: Currenttype
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function getCreatePage(req, res) {
    const type = req.params.type;
    const dropdownData = await getDropdownData();
    res.render('create', { title: 'Create', type, dropdownData });
}

const createNewObject = [
    // Validation and sanitization
    body('name').trim().isLength({ min: 1 }).escape(),
    body('title').optional({ checkFalsy: true }).trim().escape(),
    body('release_date').optional({ checkFalsy: true }).isISO8601().toDate(),

    async (req, res) => {
        const type = req.params.type;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Handle errors
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const insertedData = await insertIntoDatabase(type, req.body);
            res.redirect('/');
        } catch (error) {
            console.error('Error creating new object:', error);
            res.status(500).send('Internal Server Error');
        }
    }
];

async function getUpdatePage(req, res) {
    const { type, id } = req.params;

    try {
        const currentData = await getDetailInfo(id, type);
        if (type == 'Albums') {
            const dropdownData = await getDropdownData();
            res.render('update', { type, title: 'Update', currentData: currentData[0], dropdownData, moment });
        } else {
            res.render('update', { type, title: 'Update', currentData: currentData[0], moment });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateObject = [
    // Validation and sanitization
    param('id').isUUID().withMessage('Invalid ID format'),
    body('name').optional({ checkFalsy: true }).trim().escape(),
    body('title').optional({ checkFalsy: true }).trim().escape(),
    body('release_date').optional({ checkFalsy: true }).isISO8601().toDate(),

    async (req, res) => {
        const { type, id } = req.params;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Handle errors
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await updateDatabase(id, type, req.body);
            res.redirect('/');
        } catch (error) {
            console.error('Error updating data:', error);
            res.status(500).send('Internal Server Error');
        }
    }
];

const deleteObject = [
    // Validation and sanitization
    param('id').isUUID().withMessage('Invalid ID format'),

    async (req, res) => {
        const { type, id } = req.params;

        try {
            await deleteDatabase(id, type);
            res.redirect('/');
        } catch (error) {
            console.error('Error deleting data:', error);
            res.status(500).send('Internal Server Error');
        }
    }
];

async function searchFunction(req, res) {
    const searchQuery = req.query.searchQuery || ''; // Extract search query input from the query string
    const type = req.query.browserSelect || ''; // Extract selected browser from the query string

    console.log('Search Query:', searchQuery);
    console.log('Selected Browser:', type);

    try {
        const results = await getCategoryInfo(type);
        const gatheredInventory = results.gatheredInventory || [];

      
        let searchResults = gatheredInventory.filter(user =>
            (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.title && user.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        res.render('search', {
            title: 'Search Results',
            searchQuery,
            searchResults,
            currentType: type,
        });
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getHomePage,
    getCategory,
    getDetail,
    createNewObject,
    getCreatePage,
    getUpdatePage,
    updateObject,
    deleteObject,
    searchFunction
};
