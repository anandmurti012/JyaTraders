const express = require('express');
const multer = require('multer');
const { adminController } = require('../controllers/adminController');
const { courseController } = require('../controllers/courseController');
const { verifyAdminToken } = require('../middleware/VerifyUser');
const { targetController } = require('../controllers/targetController');
const { subscriptionController } = require('../controllers/subscriptionController');
const { userController } = require('../controllers/userController');
const { formController } = require('../controllers/formController');


// Set up storage for multer
const storage = multer.diskStorage({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB file size limit (adjust as needed)
    },
})

const upload = multer({ storage: storage })

const adminRouter = express.Router();

// Admin Controlller
adminRouter.post('/signup', upload.single('image'), adminController.signup);
adminRouter.post('/login', adminController.login);
adminRouter.post('/send-forgot-password-email', adminController.sendPasswordRecoveryEmail);
adminRouter.post('/reset-password', adminController.resetPassword);

// Couese Controller
adminRouter.post('/add-courses', verifyAdminToken, upload.single('image'), courseController.addCourses);
adminRouter.get('/view-courses', verifyAdminToken, courseController.viewCourses);
adminRouter.post('/update-course', verifyAdminToken, upload.single('image'), courseController.updateCourses);

adminRouter.get('/view-single-course', verifyAdminToken, courseController.viewSingleCourses);
adminRouter.post('/delete-courses', verifyAdminToken, courseController.deleteCourses);

adminRouter.post('/add-lectures', verifyAdminToken, upload.array('files'), courseController.addLectures);
adminRouter.get('/view-single-lectures', verifyAdminToken, courseController.getSingleLectures);
adminRouter.post('/update-lectures', verifyAdminToken, upload.array('files'), courseController.updateLectures);
adminRouter.post('/update-attachments', verifyAdminToken, upload.array('files'), courseController.updateAttachments);
adminRouter.post('/delete-attachments', verifyAdminToken, courseController.deleteAttachments);

adminRouter.get('/get-lectures', verifyAdminToken, courseController.getLectures);
adminRouter.post('/delete-lecture', verifyAdminToken, courseController.deleteLectures);

// Targets 
adminRouter.post('/set-target', verifyAdminToken, targetController.setTarget);
adminRouter.get('/get-targets', verifyAdminToken, targetController.getTargets);
adminRouter.patch('/update-target', verifyAdminToken, targetController.updateTarget);

// subscription 
adminRouter.post('/set-subscription', verifyAdminToken, subscriptionController.setSubscription);
adminRouter.get('/get-subscriptions', verifyAdminToken, subscriptionController.getSubscriptions);
adminRouter.patch('/update-subscription', verifyAdminToken, subscriptionController.updateSubscription);
adminRouter.get('/get-paymentHistory', verifyAdminToken, subscriptionController.getPaymentHistory);


adminRouter.get('/get-subscription-report', verifyAdminToken, subscriptionController.getSubscriptionReport);

// users 
adminRouter.get('/get-users', verifyAdminToken, userController.getUsers);
adminRouter.post('/add-users-subscription', verifyAdminToken, userController.addUserSubscription);
adminRouter.get('/get-users-report', verifyAdminToken, userController.getUsersReport);

adminRouter.post('/active-deactive-users', verifyAdminToken, userController.activeDeactiveUsers);

// forms 
adminRouter.post('/create-form-section', verifyAdminToken, formController.createSection);
adminRouter.get('/get-form-section', verifyAdminToken, formController.getSection);
adminRouter.post('/delete-form-section', verifyAdminToken, formController.deleteSection);

adminRouter.post('/upload-form', verifyAdminToken, upload.single('file'), formController.createForm);
adminRouter.get('/get-forms', verifyAdminToken,  formController.getForms);
adminRouter.post('/delete-forms', verifyAdminToken,  formController.deleteForms);


module.exports = { adminRouter };