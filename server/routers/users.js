const express = require('express');
const router = express.Router();
const userCont = require('../controllers/usersController');
const userauth = require('../helpers/verifyToken')

router.get('/', userCont.getAllUsers)
router.get('/:id', userauth.verifytokenforLogin, userCont.getSingleUser)
router.post('/', userCont.addNewUser)
router.post('/:id', userauth.verifytokenforLogin, userCont.pushToPostList)
router.put('/:id', userauth.verifytokenforLogin, userCont.updateUser)
router.delete('/:id', userauth.verifytokenforLogin, userCont.deleteUser)

module.exports = router
