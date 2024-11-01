const express = require('express');
const { loginController, registerController,getAllUsers,editUser, deleteUser} = require('../controllers/userController');

// route object
const router = express.Router()

//route POst|| Login User
router.post('/login', loginController);

router.post('/get-users', getAllUsers)

// route POst|| Register USER
router.post("/register",registerController);

// Edit ROute

router.put('/edit/:id', editUser);

// Delete Form
router.delete('/delete/:id', deleteUser);

module.exports = router;