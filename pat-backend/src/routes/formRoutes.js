const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// Connect to MongoDB for GridFS
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
  console.log("GridFS initialized");
});

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit per file
  fileFilter: (req, file, cb) => {
    // Allow widely used file types
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt/;
    const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop());
    const mimetype = filetypes.test(file.mimetype);
    if (extname || mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Неподдерживаемый формат файла. Разрешены: JPEG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT'));
    }
  },
}).array('medicalFiles', 10); // Max 10 files

router.post('/forms', upload, async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files;

    // Store files in GridFS and collect their IDs
    const fileIds = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const uploadStream = gfs.openUploadStream(file.originalname, {
          contentType: file.mimetype,
        });
        uploadStream.end(file.buffer);
        fileIds.push({
          fileId: uploadStream.id,
          filename: file.originalname,
        });
      }
    }

    // Add file IDs to formData
    formData.medicalFiles = fileIds;

    // Convert string numbers to actual numbers
    if (formData.numberOfLocalizations) {
      formData.numberOfLocalizations = parseInt(formData.numberOfLocalizations);
    }
    if (formData.numberOfContainers) {
      formData.numberOfContainers = parseInt(formData.numberOfContainers);
    }
    if (formData.numberOfGlasses) {
      formData.numberOfGlasses = parseInt(formData.numberOfGlasses);
    }
    if (formData.numberOfGlassesToBeMade) {
      formData.numberOfGlassesToBeMade = parseInt(formData.numberOfGlassesToBeMade);
    }
    if (formData.dateOfBirth) {
      formData.dateOfBirth = new Date(formData.dateOfBirth);
    }

    const form = new Form(formData);
    await form.save();
    res.status(201).json({ message: 'Заявка успешно отправлена' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error) => error.message);
      res.status(400).json({ error: 'Ошибка валидации', details: errors });
    } else if (err.message.includes('Неподдерживаемый формат файла')) {
      res.status(400).json({ error: 'Ошибка валидации', details: [err.message] });
    } else if (err.message.includes('File too large')) {
      res.status(400).json({ error: 'Файл слишком большой. Максимальный размер файла: 20MB' });
    } else if (err.message.includes('Too many files')) {
      res.status(400).json({ error: 'Слишком много файлов. Максимум: 10 файлов' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сохранения данных формы', details: [err.message] });
    }
  }
});

module.exports = router;