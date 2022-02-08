const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentProfile,
} = require('../controllers/users');
const { validateId, validateUserInfo, validateAvatar } = require('../middlewares/joiValidator');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentProfile);
router.get('/users/:id', auth, validateId, getUser);
router.patch('/users/me', auth, validateUserInfo, updateProfile);
router.patch('/users/me/avatar', auth, validateAvatar, updateAvatar);

module.exports = router;
