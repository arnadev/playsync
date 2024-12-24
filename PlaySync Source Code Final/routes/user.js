const express=require('express');
const handlers=require('../controllers/user');
const upload = require('../services/fileupload');


const router=express.Router();

router.post('/signup',handlers.handleUserSignup);
router.post('/login',handlers.handleUserLogin);
router.post('/profile',handlers.handleUserProfileUpdate);

router.post('/search',handlers.handleSearch);
router.post('/friend',handlers.handleFriend);
router.delete('/friend',handlers.handleFriend);
router.post('/pfp',upload.single('pfp'),handlers.handleProfilePictureUpload);
router.delete('/pfp',handlers.handleProfilePictureDelete);
router.post('/rating',handlers.handleUserRating);

router.post('/schedule',handlers.handleJoinSchedule);



module.exports=router;