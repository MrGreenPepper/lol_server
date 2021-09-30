const fs = require('fs');
const path = require('path');
const championList = require('../../lol_scraper/extractor/data/championList.json');

const getChampionList = (req, res) => {
    res.status(200).json({ success: true, data: championList });
};

module.exports = getChampionList;
