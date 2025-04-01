const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Counter = require('../models/Counter');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// GridFS setup
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
  console.log("GridFS initialized");
});

// Multer setup (unchanged)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt/;
    const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop());
    const mimetype = filetypes.test(file.mimetype);
    if (extname || mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Неподдерживаемый формат файла. Разрешены: JPEG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT'));
    }
  },
}).array('medicalFiles', 10);

// Nodemailer setup (unchanged)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vanshnewsbot@gmail.com',
    pass: 'nqqk lggg dugp ixjl',
  },
});

// Generate PDF in memory and return buffer
const generatePDF = (formData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.on('error', reject);

    doc.registerFont('PTSansNarrow', path.join(__dirname, '..', 'assets', 'PTSansNarrow-Regular.ttf'));
    doc.font('PTSansNarrow');

    const logoPath = path.join(__dirname, '..', 'assets', 'Pathologica.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 50, { width: 200, align: 'center' });
    } else {
      doc.fontSize(16).text('Pathologica', 50, 50, { align: 'center' });
    }
    doc.moveDown(4);

    doc.fillColor('#3097a9')
       .fontSize(16)
       .text(`Заявка ${formData.applicationId}`, { align: 'center' })
       .moveDown(1);

    const drawDivider = () => {
      doc.lineWidth(1)
         .strokeColor('#d5e6e9')
         .moveTo(50, doc.y)
         .lineTo(550, doc.y)
         .stroke()
         .moveDown(1);
    };

    const addField = (label, value) => {
      if (value !== undefined && value !== null && value !== '' && value !== false) {
        doc.fillColor('#08788b')
           .fontSize(12)
           .text(`${label}:`, 70, doc.y, { continued: true })
           .fillColor('#000000')
           .text(` ${value}`, { align: 'left' })
           .moveDown(0.5);
      }
    };

    doc.fontSize(14).fillColor('#08788b').text('Общая информация', 50, doc.y);
    drawDivider();
    addField('Кем Вы приходитесь пациенту', formData.relationToPatient);
    addField('Вид консультации', formData.consultationType);
    addField('Категория исследования', formData.researchCategory);

    if (formData.relationToPatient === 'Я доверенное лицо') {
      doc.fontSize(14).fillColor('#08788b').text('Данные доверенного лица', 50, doc.y);
      drawDivider();
      addField('Фамилия', formData.trusteeSurname);
      addField('Имя', formData.trusteeName);
      addField('Отчество', formData.trusteePatronymic);
      addField('Телефон', formData.trusteePhoneNumber);
      addField('Электронная почта', formData.trusteeEmail);
    }

    doc.fontSize(14).fillColor('#08788b').text('Данные пациента', 50, doc.y);
    drawDivider();
    addField('Фамилия', formData.lastName);
    addField('Имя', formData.firstName);
    addField('Отчество', formData.middleName);
    addField('Пол', formData.gender);
    addField('Дата рождения', formData.dateOfBirth.toLocaleDateString('ru-RU'));
    addField('Возраст', formData.age);
    addField('Телефон', formData.phoneNumber);
    addField('Электронная почта', formData.email);

    doc.fontSize(14).fillColor('#08788b').text('Медицинская информация', 50, doc.y);
    drawDivider();
    addField('Клинический диагноз', formData.clinicalDiagnosis);
    addField('Локализация процесса', formData.processLocalization);
    addField('Способ получения материала', formData.materialCollectionMethod);
    addField('Количество локализаций', formData.numberOfLocalizations);
    addField('Количество контейнеров', formData.numberOfContainers);
    addField('Количество стекол', formData.numberOfGlasses);
    addField('Количество стекол к изготовлению', formData.numberOfGlassesToBeMade);
    addField('Цена исследования', `${formData.researchPrice} ₽`);
    addField('Промокод', formData.promoCode);

    doc.fontSize(14).fillColor('#08788b').text('Доставка', 50, doc.y);
    drawDivider();
    addField('Способ доставки', formData.deliveryMethod);
    if (formData.deliveryMethod === 'Курьером') {
      addField('Город', formData.city);
      addField('Улица', formData.street);
      addField('Дом', formData.house);
      addField('Квартира', formData.apartment);
    }
    addField('Комментарий', formData.comment);
    addField('Согласие на обработку данных', formData.consentGiven ? 'Да' : 'Нет');

    doc.end();
  });
};

// POST route with GridFS PDF storage
router.post('/forms', upload, async (req, res) => {
  try {
    console.log('Received form submission:', req.body);
    const formData = req.body;
    const files = req.files;

    // Generate Application ID
    console.log('Generating applicationId...');
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    let counter = await Counter.findOne({ month: parseInt(month), year });
    console.log('Counter fetched:', counter);
    if (!counter) {
      counter = new Counter({ month: parseInt(month), year, count: 0 });
      console.log('New counter created:', counter);
    }
    counter.count += 1;
    await counter.save();
    console.log('Counter saved:', counter);

    const formNumber = String(counter.count).padStart(3, '0');
    const applicationId = `№PLG-${formNumber}/${month}/${year}`;
    formData.applicationId = applicationId;
    console.log('Generated applicationId:', applicationId);

    // Store medical files
    console.log('Storing medical files...');
    const fileIds = [];
    if (files && files.length > 0) {
      if (!gfs) throw new Error('GridFS not initialized');
      for (const file of files) {
        const uploadStream = gfs.openUploadStream(file.originalname, {
          contentType: file.mimetype,
        });
        uploadStream.end(file.buffer);
        fileIds.push({ fileId: uploadStream.id, filename: file.originalname });
      }
    }
    formData.medicalFiles = fileIds;
    console.log('Medical files stored:', fileIds);

    // Convert fields
    if (formData.numberOfLocalizations) formData.numberOfLocalizations = parseInt(formData.numberOfLocalizations);
    if (formData.numberOfContainers) formData.numberOfContainers = parseInt(formData.numberOfContainers);
    if (formData.numberOfGlasses) formData.numberOfGlasses = parseInt(formData.numberOfGlasses);
    if (formData.numberOfGlassesToBeMade) formData.numberOfGlassesToBeMade = parseInt(formData.numberOfGlassesToBeMade);
    if (formData.dateOfBirth) formData.dateOfBirth = new Date(formData.dateOfBirth);

    const form = new Form(formData);
    console.log('Saving initial form...');
    await form.save();
    console.log('Initial form saved:', form._id);

    // Generate PDF
    console.log('Generating PDF...');
    const pdfBuffer = await generatePDF(form).catch(err => {
      console.error('PDF generation failed:', err);
      throw err;
    });
    console.log('PDF generated, size:', pdfBuffer.length);

    // Store PDF in GridFS
    if (!gfs) throw new Error('GridFS not initialized');
    const pdfFileName = `Заявка_${form.applicationId.replace(/№PLG-/, '').replace(/\//g, '_')}.pdf`;
    const pdfUploadStream = gfs.openUploadStream(pdfFileName, { contentType: 'application/pdf' });
    pdfUploadStream.end(pdfBuffer);
    const pdfId = pdfUploadStream.id;
    form.tempPdfPath = pdfId.toString();
    console.log('PDF stored in GridFS, tempPdfPath:', pdfId);
    await form.save();
    console.log('Form updated with tempPdfPath');

    // Email
    console.log('Retrieving PDF for email...');
    const pdfDownloadStream = gfs.openDownloadStream(pdfId);
    const pdfBuffers = [];
    pdfDownloadStream.on('data', (chunk) => pdfBuffers.push(chunk));
    const pdfAttachment = await new Promise((resolve, reject) => {
      pdfDownloadStream.on('end', () => resolve(Buffer.concat(pdfBuffers)));
      pdfDownloadStream.on('error', reject);
    });
    console.log('PDF retrieved for email, size:', pdfAttachment.length);

    const mailOptions = {
      from: 'vanshnewsbot@gmail.com',
      to: 'vansh.vjain20@gmail.com',
      subject: `Получена новая заявка ${form.applicationId} - ${form.consultationType}`,
      text: `Получена новая заявка на ${form.consultationType}.\nДополнительная информация доступна в личном кабинете: https://admin.pathologica.ru`,
      attachments: [{ filename: pdfFileName, content: pdfAttachment }],
    };
    console.log('Sending email...');
    await transporter.sendMail(mailOptions).catch(err => {
      console.error('Email sending failed:', err);
      throw err;
    });
    console.log('Email sent');

    // Cleanup
    console.log('Deleting PDF from GridFS...');
    await gfs.delete(pdfId);
    form.tempPdfPath = '';
    await form.save();
    console.log('PDF deleted, form updated');

    console.log('Form submission complete');
    res.status(201).json({ message: 'Заявка успешно отправлена' });
  } catch (err) {
    console.error('Form submission error:', err.message, err.stack);
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
      res.status(500).json({ error: 'Ошибка сохранения данных формы', details: [err.message] });
    }
  }
});

module.exports = router;