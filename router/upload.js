const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    }
});

const upload = multer({ storage });

// Endpoint to handle file upload
router.post('/uploadFile', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ filePath });
});

module.exports = router;
