const express = require('express');
const multer = require('multer');
const { userController } = require('../controllers/userController');
const { courseController } = require('../controllers/courseController');
const { verifyUserToken } = require('../middleware/VerifyUser');
const { subscriptionController } = require('../controllers/subscriptionController');
const { targetController } = require('../controllers/targetController');
const { makeEntryController } = require('../controllers/makeEntryController');
const { monthlyTargetController } = require('../controllers/monthlyTarget');
const { prospectsController } = require('../controllers/prospectsController');
const { formController } = require('../controllers/formController');

// Set up storage for multer
const storage = multer.diskStorage({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB file size limit (adjust as needed)
    },
})
const upload = multer({ storage: storage })

const userRouter = express.Router();

userRouter.post('/signup', upload.single('image'), userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/send-forgot-password-email', userController.sendPasswordRecoveryEmail);
userRouter.post('/reset-password', userController.resetPassword);

userRouter.post('/update-profile', verifyUserToken, userController.updateProfile);
userRouter.post('/update-image', upload.single('image'), verifyUserToken, userController.updateProfileImage);


userRouter.get('/get-courses', verifyUserToken, courseController.viewCourses);
userRouter.get('/view-single-course', verifyUserToken, courseController.viewSingleCourses);
userRouter.get('/get-lectures', verifyUserToken, courseController.getLectures);

userRouter.get('/get-subscribe-courses', verifyUserToken, courseController.getSubscribeCourses);
userRouter.get('/get-single-subscribe-courses', verifyUserToken, courseController.getSingleSubscribeCourses);

// check subscription is expire or not
userRouter.post('/check-validation', verifyUserToken, subscriptionController.checkValidation);

// subscription 
userRouter.get('/get-subscriptions', verifyUserToken, subscriptionController.getSubscriptions);

// Targets 
userRouter.get('/get-targets', verifyUserToken, targetController.getTargets);
userRouter.get('/get-my-target', verifyUserToken, targetController.getMyTargets);
userRouter.post('/set-targets', verifyUserToken, targetController.addTarget);

userRouter.get('/get-targetsdetails', verifyUserToken, targetController.getTargetsDetails);

// monthlyTargetController
userRouter.post('/set-monthly-target', verifyUserToken, monthlyTargetController.setTarget);
userRouter.get('/get-monthly-target', verifyUserToken, monthlyTargetController.getTargets);

// make a entry
userRouter.post('/make-entry', verifyUserToken, makeEntryController.makeEntry);
userRouter.patch('/update-entry', verifyUserToken, makeEntryController.updateEntry);
userRouter.get('/get-entry', verifyUserToken, makeEntryController.getEntry);
userRouter.get('/export-entries', verifyUserToken, makeEntryController.exportEntries);

// get-commissions
userRouter.get('/get-commissions', verifyUserToken, makeEntryController.getCommissions);
userRouter.get('/get-mdrt-commissions', verifyUserToken, makeEntryController.getMdrtCommissions);


// prospects client
userRouter.post('/add-client', verifyUserToken, prospectsController.addClient);
userRouter.get('/get-clients', verifyUserToken, prospectsController.getClients);
userRouter.post('/update-client', verifyUserToken, prospectsController.updateClients);
userRouter.post('/delete-client', verifyUserToken, prospectsController.deleteClients);

// prospects
userRouter.get('/get-clients-data', verifyUserToken, prospectsController.getClientsData);
userRouter.post('/add-prospect', verifyUserToken, prospectsController.addProspect);
userRouter.get('/get-prospects', verifyUserToken, prospectsController.getProspects);
userRouter.post('/update-prospect', verifyUserToken, prospectsController.updateProspect);
userRouter.post('/delete-prospect', verifyUserToken, prospectsController.deleteProspect);

userRouter.get('/get-appointment', verifyUserToken, prospectsController.getAppointment);
userRouter.patch('/upadte-appointment', verifyUserToken, prospectsController.updateAppointment);
userRouter.get('/get-today-followup', verifyUserToken, prospectsController.getTodayFollowUps);


userRouter.get('/get-forms',  formController.getForms);
userRouter.get('/get-form-section', formController.getSection);


userRouter.get('/get-prospects-report',verifyUserToken, prospectsController.getProspectsReports);
userRouter.get('/get-appointments-report',verifyUserToken, prospectsController.getProspectsReports);

userRouter.get('/get-today-followup-report',verifyUserToken, prospectsController.getTodaysFollowUpReports);

module.exports = { userRouter };