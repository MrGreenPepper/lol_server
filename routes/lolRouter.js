const express = require('express');
const router = express.Router();
const getChampionList = require('../controllers/getChampionList.js');

router.get('/championList', getChampionList);

module.exports = router;
