const { UploadedFileController } = require('../controllers');
const { uploadMiddleware } = require('../file-uploads');

const router = require('express').Router();

router.post(
	'/upload',
	uploadMiddleware('file', true),
	UploadedFileController.add
);
router.get('/:id', UploadedFileController.getOne);

router.delete('/:id', UploadedFileController.delete);

module.exports = router;
