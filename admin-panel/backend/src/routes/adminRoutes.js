const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const auth = require('../middleware/auth');

// Get all forms (protected)
router.get('/forms', auth, async (req, res) => {
  try {
    const forms = await Form.find().sort({ submittedAt: -1 });
    res.json(forms);
  } catch (err) {
    console.error('Error fetching forms:', err.message);
    res.status(500).json({ error: 'Ошибка при получении форм.' });
  }
});

// Get a form by ID (protected)
router.get('/forms/:id', auth, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Форма не найдена.' });
    }
    res.json(form);
  } catch (err) {
    console.error('Error fetching form:', err.message);
    res.status(500).json({ error: 'Ошибка при получении формы.' });
  }
});

// Update form status and add notes (protected)
router.put('/forms/:id', auth, async (req, res) => {
  const { status, notes } = req.body;
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Форма не найдена.' });
    }

    // Validate status
    const validStatuses = ['Completed', 'Pending', 'Uncontacted'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Недопустимое значение статуса. Допустимые значения: Completed, Pending, Uncontacted.' });
    }

    if (status) form.status = status;
    if (notes !== undefined) form.notes = notes; // Allow empty notes to clear the field
    form.updatedAt = Date.now();

    await form.save();
    res.json(form);
  } catch (err) {
    console.error('Error updating form:', err.message);
    res.status(500).json({ error: 'Ошибка при обновлении формы: ' + err.message });
  }
});

module.exports = router;