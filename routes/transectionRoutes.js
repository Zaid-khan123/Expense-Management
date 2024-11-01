const express = require('express');
const { addTransection, getAllTransection,editTransection,deleteTransection} = require('../controllers/transectionCtrl');


// route object
const router = express.Router();


//routes
// add transection POST method

router.post('/add-transection', addTransection);
// Edit transection POST METHOD
router.post('/edit-transection', editTransection)
// get transection
router.post('/get-transection', getAllTransection );

router.post('/delete-transection', deleteTransection);

module.exports = router;