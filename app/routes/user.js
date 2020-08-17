const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const multer = require('multer');

const date = new Date();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, date.getTime() + file.originalname);
    }
});

// Filter file type to jpeg or png only
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


const UserController = require('../controllers/users')

// Register route
router.post('/register', upload.single('avatar'), UserController.user_register)

// Login route
router.post('/login', UserController.user_login)

// Get user details with auth middleware
router.get('/:userId', authMiddleware, UserController.get_user)

module.exports = router