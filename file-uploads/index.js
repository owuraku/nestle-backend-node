const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs').promises;
const destinationFolder = process.env.UPLOAD_DESTINATION || 'uploads';

(async () => {
	await fs.mkdir(destinationFolder).catch((e) => console.warn(e.message));
})();

// an array of allowed file mime types to upload
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg ', 'image/jpg'];

// a multer storage to help change file name and add file extension
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, destinationFolder);
	},
	filename: function (req, file, cb) {
		cb(null, uuid() + path.extname(file.originalname)); //Appending extension
	},
});

/**
 *	This middleware function will upload your file/files from the request into a specified folder
	"uploads" is the default folder. It also runs file validation on the size and mime type of the file
	It returns a request object with file/files object and also a body object for text fields. This middleware
	will return an error if validation fails
 * 
 * @param {string || object: {field: string; max: number}} propertyName The file property name from the request @default: file
 * @param {boolean} single if true it uses multer .single() otherwise multer.array()
 * @returns a middleware handler function that uploads your file
 */
const uploadMiddleware = (propertyName = 'file', single = true) => {
	const uploader = multer({
		storage,
		fileFilter: (req, file, cb) => {
			const isValid = ALLOWED_MIME_TYPES.includes(file.mimetype);
			let error = isValid
				? null
				: new multer.MulterError('LIMIT_UNEXPECTED_FILE');
			cb(error, isValid);
		},
		limits: {
			fileSize: +process.env.MAX_FILE_UPLOAD_SIZE || 2097152,
		},
	});
	const singleUpload = uploader.single(propertyName);
	if (single) {
		return (req, res, next) =>
			singleUpload(req, res, multerErrorHandler(req, res, next));
	} else {
		const field = propertyName['field'];
		const max = propertyName['max'];
		if (!field || !max) {
			throw new Error(
				'If upload not single, property name should be an object containing field and max properties'
			);
		}
		return (req, res, next) =>
			uploader.array(field, max)(
				req,
				res,
				multerErrorHandler(req, res, next)
			);
	}
};

const multerErrorHandler = (req, res, next) => {
	return (err) => {
		if (err) {
			if (err instanceof multer.MulterError) {
				return res.status(400).send({
					message: `Unable to save file. ${err.message}`,
				});
			}
			return res.status(500).send({
				message: 'Unable to save file. Error occured',
			});
		}

		next();
	};
};

module.exports = {
	uploadMiddleware,
};
