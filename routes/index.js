const router = require('express').Router();
const authRoutes = require('./auth.routes');
const uploadRoutes = require('./upload.routes');

router.use('/auth', authRoutes);
router.use('/file', uploadRoutes);

module.exports = router;
