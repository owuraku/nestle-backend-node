const mongoose = require('mongoose');

const UploadedFileSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
		unique: true,
	},
	createdBy: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

/**
 *
 * @param {string} filename the name of the file to find
 *
 * @returns the file document
 */
UploadedFileSchema.statics.findFileByName = async function (filename) {
	return this.findOne({ name: filename });
};

module.exports = mongoose.model('uploadedFile', UploadedFileSchema);
