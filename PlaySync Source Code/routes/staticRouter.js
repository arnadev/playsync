const express=require('express');
const router=express.Router();
const Profile=require('../models/profile');
const User=require('../models/user');
const Friend=require('../models/friend');
const Schedule=require('../models/schedule');




router.get('/',async (req,res)=>{
    if(req.userid){
        return res.redirect('/home');
    }
    res.render('index');
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/home',async (req,res)=>{
    const user = await User.findOne({_id: req.userid});
    const username = user.username.toUpperCase();
    res.render('home',{
        username:username,
    });
});

router.get('/friend',async (req,res)=>{
    const user=await Friend.findOne({userId:req.userid});
    res.render('friend',{
        friendsList:user.friendsList,
        friendRequests:user.friendRequests,
    });
});


router.get('/about',async (req,res)=>{
    res.render('about');
});



router.get('/profile',async (req,res)=>{

    const user=await User.findOne({_id:req.userid});
    const profileData=await Profile.findOne({belongsTo:req.userid});
    const profilePictureUrl='/pfps/'+profileData.profilePictureName;
    return res.render('profile',{

        username: user.username,
        email: user.email,
        profileData: profileData,
        isOwner: true,
        profilePictureUrl:profilePictureUrl,
    });
});

router.get('/profile/:username',async (req,res)=>{

    const visitedUser = await User.findOne({ username: req.params.username });

    if (visitedUser == null) {
        return res.status(404).send('404 not found');
    }

    const loggedUser = await User.findOne({ _id: req.userid });
    if(loggedUser._id==visitedUser._id){
        return res.redirect('/profile');
    }

    const profileData = await Profile.findOne({ belongsTo: visitedUser._id });
    const visitedUserFriendData=await Friend.findOne({userId:visitedUser._id});
    const userFriendData=await Friend.findOne({userId:req.userid});


    let friendStatus;
    if(visitedUserFriendData.friendsList.includes(loggedUser.username)){
        friendStatus='friend';
    }
    else if(visitedUserFriendData.friendRequests.includes(loggedUser.username)){
        friendStatus='requestSent';
    }
    else if(userFriendData.friendRequests.includes(visitedUser.username)){
        friendStatus='requestReceived';
    }
    else{
        friendStatus='notFriend';
    }

    console.log(friendStatus);
    
    const profilePictureUrl='/pfps/'+profileData.profilePictureName;
    return res.render('profile', {
        username: visitedUser.username,
        email: visitedUser.email,
        profileData: profileData,
        isOwner: false,
        friendStatus:friendStatus,
        profilePictureUrl:profilePictureUrl,
    });
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.redirect('/');
});

router.get('/play',(req,res)=>{
    res.render('play');
});

router.get('/schedule',async (req,res)=>{
    const location=req.query.location;
    const sport=req.query.sport;
    const schedule= await Schedule.findOne({location:location,sport:sport});
    if(schedule==null){
        return res.status(404).send('404 not found');
    }
    res.render('schedule',{
        location:location,
        sport:sport,
        schedule:schedule,
        playerCount:schedule.numPlayers
    });
});

module.exports = router;