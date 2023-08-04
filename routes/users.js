const router = require('express').Router();
const { validateProfilUpdate } = require('../utils/regex');

const { getUserInfo, updateProfileUser } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', validateProfilUpdate, updateProfileUser);

module.exports = router;
