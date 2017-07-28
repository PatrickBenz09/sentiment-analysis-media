const express = require('express');
const router = express.Router();
const userCont = require('../controllers/usersController');
const userauth = require('../helpers/verifyToken')

router.get('/', userCont.getAllUsers)
router.get('/:id', userCont.getSingleUser)
router.post('/', userCont.addNewUser)
router.post('/:id', userCont.pushToPostList)
router.put('/:id', userCont.updateUser)
router.delete('/:id', userCont.deleteUser)

module.exports = router
