const express = require("express");
const router = express.Router();
const {getMenu, getMenuById} = require('../Controller/menucontroller');

router.route('/').get(getMenu);
router.route('/:id').get(getMenuById);

module.exports = router;