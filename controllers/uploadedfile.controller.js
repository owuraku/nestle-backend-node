const fs = require('fs/promises');
const { FileUpload } = require('../models');
const path = require('path');

class UploadedFileController {
	async add(req, res) {
		const file = req.file;
		const fileInfo = new FileUpload({
			name: file.filename,
			path: file.path,
		});

		const savedInfo = await fileInfo.save().catch(async (e) => {
			console.log(e);
			await fs.unlink(file.path);
			return res
				.status(400)
				.send({ message: 'File upload failed. Try again later' });
		});

		res.send({ message: 'File uploaded successfully', data: savedInfo });
	}

	async getOne(req, res) {
		const { id } = req.params;
		const fileInfo = await FileUpload.findById(id);
		if (!fileInfo) {
			return res.status(404).send({ message: 'File not found' });
		}
		const filepath = path.join(__dirname, '../', fileInfo.path);
		return res.sendFile(filepath);
	}

	async delete(req, res) {
		const { id } = req.params;
		const fileInfo = await FileUpload.findById(id);
		if (!fileInfo) {
			return res.status(404).send({ message: 'File not found' });
		}
		await fs.unlink(fileInfo.path);
		return res.send({ message: 'Delete successful' });
	}
}

module.exports = new UploadedFileController();
