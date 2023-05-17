const express = require('express');
const { getTours,postTours,updateTours,deleteTours } = require('../controller/tourismController');
const router = express.Router();

router.route('/').get(getTours).post(postTours)
router.route('/:id').put(updateTours).delete(deleteTours)
module.exports = router